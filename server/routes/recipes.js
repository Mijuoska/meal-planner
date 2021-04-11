const express = require('express');
const db = require('../db');
const router = express.Router();



router.get('/', async (req, res, next) => {
  try {
    const {
      rows
    } = await db.query('SELECT * FROM recipes')
    res.send(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: err.toString()
    })
  }
})


router.get('/:id', async (req, res, next) => {
  try {
    const {
      rows
    } = await db.query(`SELECT recipes.id, recipes.name, instructions, preparation_time, created_by, 
    ingredients.id AS ingredient_id, ingredients.name AS ingredient_name, ingredient_quantity.id AS iq_id, ingredient_quantity.unit, ingredient_quantity.quantity, ingredient_quantity.recipe_id
    FROM recipes 
    INNER JOIN ingredient_quantity ON ingredient_quantity.id = ANY(recipes.ingredients)
    INNER JOIN ingredients ON ingredients.id = ingredient_quantity.ingredient
    WHERE recipes.id = $1`, [req.params.id])
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

  } catch (err) {
    res.status(500).json({
      err: err.toString()
    })
  }
});

/** 
 * Get ingredients for a specific recipe from the ingredient_quantity table
 * 
*/


router.get('/:id/ingredients', async (req, res, next) => {
  try {
    // TO DO: make this query more efficient once we can store recipe_id in ingredients
    const {
      rows
    } = await db.query(`SELECT ingredient_quantity.id, ingredient AS value, quantity, unit, name AS label FROM ingredient_quantity 
    INNER JOIN ingredients ON ingredients.id = ingredient 
    WHERE ingredient_quantity.id IN 
      (SELECT UNNEST(ingredients) FROM recipes 
      WHERE recipes.id = $1)`, [req.params.id])
    res.send(rows)
  } catch (err) {
    res.status(500).send({error: err.toString()})
  }
})


router.post('/', async (req, res, next) => {
  const {
    body
  } = req
  try {
   /**
    *  We store the ingredient IDs in an array that is saved in the recipe's ingredients field in the DB.
    *  For each ingredient, we save an entry into the ingredient_quantity table. 
    * Each of these also has a reference to the recipe they are associated with (recipe_id)
    */

     const ingredientIDs = []
     body.ingredients.forEach(async (ingredient) => {
       const {
         rows
       } = await db.query(`INSERT INTO ingredient_quantity (ingredient, quantity, unit)
    VALUES($1, $2, $3) RETURNING id`, [ingredient.value, ingredient.quantity, ingredient.unit])
      ingredientIDs.push(rows[0].id)
     })
    const { rows } = await db.query(`INSERT INTO recipes (name, preparation_time, ingredients, instructions) 
    values ($1,$2,$3,$4) RETURNING *`, [body.name, body.duration, ingredientIDs, body.instructions])

    res.status(201).send(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: err.toString()
    })
  }
})

router.put('/:id', async (req, res, next) => {
  const {
    body
  } = req
  try {
    const ingredientIDs = []
    body.ingredients.forEach(async (ingredient) => {
      if (!ingredient.id) {
      const ingredientsResult = await db.query(`INSERT INTO ingredient_quantity (ingredient, quantity, unit) 
      VALUES ($1, $2, $3) RETURNING id`, [ingredient.value, ingredient.quantity, ingredient.unit])
      ingredientIDs.push(ingredientsResult.rows[0].id)
      } else {
        await db.query(`UPDATE ingredient_quantity 
        SET ingredient = $1, quantity = $2, unit = $3 
        WHERE id = $4`, [ingredient.value, ingredient.quantity, ingredient.unit, ingredient.id])
        ingredientIDs.push(ingredient.id)
      }
    
    })

    const { rows } = await db.query(`UPDATE recipes SET name = $1, preparation_time = $2, 
    ingredients = $3, instructions = $4 WHERE id = $5 RETURNING *`, 
    [body.name, body.duration, ingredientIDs, body.instructions, req.params.id])
    res.send(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: err.toString()
    })
  }
})


router.delete('/:id', async (req, res, next) => {
  try {
// get the ingredients array and delete matching ingredient instances
// delete the ingredient
await db.query(`DELETE from ingredient_quantity WHERE id IN 
(SELECT UNNEST(ingredients) FROM recipes WHERE id = $1)`, [req.params.id])

  await db.query(`DELETE FROM recipes WHERE id = $1`, [req.params.id])
  res.status(204).send(`Successfully deleted recipe with the id ${req.params.id}`)
  } catch (err) {
    console.error(err)
    res.status(500).send('Something went wrong')
  }

})




module.exports = router;