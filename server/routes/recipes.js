const express = require('express');
const AppError = require('../AppError');
const router = express.Router();
const helper = require('../utils/helpers')
const middleware = require('../middleware');
const QueryBuilder = require('../db/querybuilder');

const {
  asyncWrapper
} = helper

const {
  checkIfLoggedIn
} = middleware


router.get('/', checkIfLoggedIn, asyncWrapper(async (req, res, next) => {
  const household = req.user ? req.user.households[0] : ''
  const qb = new QueryBuilder('recipes')
  try {


    const {
      rows
    } = await qb.select().addCondition('household_id','=',household).exec()

    res.send(rows)
  } catch (ex) {
    console.log(ex);
    return next(new AppError('Something went wrong', 500))

  }
}))


router.get('/:id', asyncWrapper(async (req, res, next) => {
  const qb = new QueryBuilder('recipes')

  const {
    rows
  } = await qb.select(`recipes.id, recipes.name, instructions, preparation_time, created_by, 
      ingredients.id AS ingredient_id, ingredients.name AS ingredient_name, 
      ingredient_quantity.id AS iq_id, ingredient_quantity.unit, 
      ingredient_quantity.quantity, ingredient_quantity.recipe_id`).
  innerJoin('ingredient_quantity', 'ingredient_quantity.id', 'ANY(recipes.ingredients)').
  innerJoin('ingredients', 'ingredients.id', 'ingredient_quantity.ingredient').
  addCondition('recipes.id','=', req.params.id)
  .exec()


  const result = {
    id: rows[0].id,
    name: rows[0].name,
    instructions: rows[0].instructions,
    preparation_time: rows[0].preparation_time,
    created_by: rows[0].created_by,
    ingredients: rows.map(i => {
      return {
        'id': i.iq_id,
        'value': i.ingredient_id,
        'label': i.ingredient_name,
        'quantity': i.quantity,
        'unit': i.unit,
        'recipe_id': i.recipe_id
      }

    })
  }
  
  res.send(result)


}));

/** 
 * Get ingredients for a specific recipe from the ingredient_quantity table
 */

router.get('/:id/ingredients', asyncWrapper(async (req, res, next) => {
  const qb = new QueryBuilder('recipes')
  const subquery = await qb.select('UNNEST(ingredients)')
  .addCondition('recipes.id','=', req.params.id)
  .getAsSubquery()

  
  const {
    rows
  } = await new QueryBuilder('ingredient_quantity')
  .select('ingredient_quantity.id, ingredient AS value, quantity, unit, name AS label')
    .innerJoin('ingredients', 'ingredients.id', 'ingredient')
    .whereSubquery('ingredient_quantity.id', '=',`ANY(${subquery})`)
    .exec()
  res.send(rows)

}))


router.post('/', asyncWrapper(async (req, res, next) => {

  const {
    body
  } = req

  /**
   *  We store the ingredient IDs in an array that is saved in the recipe's ingredients field in the DB.
   *  For each ingredient, we save an entry into the ingredient_quantity table. 
   */
try {
  const ingredientIDs = []
  body.ingredients.forEach(async (ingredient) => {
    const { value, quantity, unit } = ingredient
   console.log('households', req.user.households[0])
    const {
      rows
    } = await new QueryBuilder('ingredient_quantity')
    .insert({
        ingredient: value,
        quantity: quantity,
        unit: unit,
        household: req.user.households[0]
      })
      .returning('id').exec()
    ingredientIDs.push(rows[0].id)
  })

  const { name, duration, instructions } = body
  const {
    rows
  } = await new QueryBuilder('recipes')
  .insert({
    name: name,
    preparation_time: duration,
    ingredients: ingredientIDs,
    instructions: instructions,
    created_by: req.user.username,
    household_id: req.user.households[0]
  }).returning('*').exec()

  res.status(201).send(rows)

} catch (ex) {
  console.log(ex);
  return next(new AppError('Something went wrong with saving the recipe', 500))
  
}

}))

router.put('/:id', asyncWrapper(async (req, res, next) => {
  const {
    body
  } = req


  /**
   *  First we have to compare the ingredients in the request list to the one in the db so that we can
   *  delete removed ingredient instances from the db
   */

  try {

  const existingIngredientsResult = 
  await new QueryBuilder('recipes').select('UNNEST(ingredients)').addCondition('id', '=', req.params.id).exec()


  deletedIngredients = existingIngredientsResult.rows
    .filter(r => body.ingredients.map(i => i.id).indexOf(r.unnest) == -1)


  if (deletedIngredients.length > 0) {
    deletedIngredients.forEach(async (ingredient) => {
      await new QueryBuilder('ingredient_quantity').delete().addCondition('ingredient','IN', ingredient.unnest).exec()
    })
  }

  /**
   * We then have to either add new ingredient instances or update them (if quantity or units have changed)
   */

  const ingredientIDs = []

  for (ingredient of body.ingredients) {
      

    let ingredientsResult
    if (!ingredient.id) {
      const { value, quantity, unit} = ingredient
      
      ingredientsResult = await new QueryBuilder('ingredient_quantity').insert({
          ingredient: value,
          quantity: quantity,
          unit: unit,
          household: req.user.households[0]
        })
        .returning('id').exec()
        ingredientIDs.push(ingredientsResult.rows[0].id)

    } else {
      const { value, quantity, unit, id} = ingredient
      ingredientsResult = await new QueryBuilder('ingredient_quantity').update({
        ingredient: value,
        quantity: quantity,
        unit: unit
      }).addCondition('id', '=', id).returning('id').exec()
      ingredientIDs.push(ingredientsResult.rows[0].id)

    }

  }

  /**
   * Finally, we update the recipe
   */

  const {name, duration, instructions} = body
  
  const {
    rows
  } = await new QueryBuilder('recipes').update({
      name: name,
      preparation_time: duration,
      ingredients: ingredientIDs,
      instructions: instructions
    }).addCondition('id','=', req.params.id)
    .returning('*').exec()
  res.send(rows)

  } catch (ex) {
    console.log(ex);
    return next(new AppError('Something went wrong with updating the recipe', 500))
    
  }

}))


router.delete('/:id', asyncWrapper(async (req, res, next) => {
  // get the ingredients array and delete matching ingredient instances
  // delete the ingredient
  try {
  const subquery = await new QueryBuilder('recipes').select('UNNEST(ingredients)').addCondition('id','=',req.params.id).getAsSubquery()
  await new QueryBuilder('ingredient_quantity').delete().whereSubquery('id', 'IN', subquery).exec()

  await new QueryBuilder('recipes').delete().addCondition('id','=', req.params.id).exec()
// TODO: check if the resource has really been deleted
  res.status(204).send(`Successfully deleted recipe with the id ${req.params.id}`)
  } catch (ex) {
    console.log(ex)
  }
}))




module.exports = router;