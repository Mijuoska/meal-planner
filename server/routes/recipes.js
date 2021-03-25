const express = require('express');
const db = require('../db');
const router = express.Router();



router.get('/', async (req, res, next) => {
    try {
const { rows } = await db.query('SELECT * FROM recipes')
res.send(rows)
} catch (err) {
  console.error(err)
  res.status(500).json({
      error: err.toString()
  })
}
})

router.post('/', async (req, res, next) => {
  const { body } = req
  try {
    body.ingredients.forEach(async (ingredient) => {
    db.query(`INSERT INTO ingredient_quantity (ingredient, quantity, unit)
    VALUES ($1,$2,$3)`,[ingredient.value, ingredient.quantity, ingredient.unit])})
    const ingredientIDs = body.ingredients.map(i => i.value)
    const result = await db.query(`INSERT INTO recipes (name, preparation_time, ingredients, instructions) 
    values ($1,$2,$3,$4)`, [body.name, body.duration, ingredientIDs, body.instructions])
    res.send(result)
    console.log(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({error: err.toString()})
  }
})

   

router.get('/:id', async (req, res, next) => {
    try {
const { rows } = await db.query('SELECT * FROM recipes WHERE recipes.id = $1', [req.params.id])
res.send(rows)
} catch (err) {
  res.status(500).json({
      err: err.toString()
  })
}
});




module.exports = router;