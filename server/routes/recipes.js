const express = require('express');
const db = require('../db');
const router = express.Router();



router.get('/', async (req, res, next) => {
    try {
const { rows } = await db.query('SELECT * FROM recpes')
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
const { rows } = await db.query('SELECT * FROM recipes WHERE recipes.id = $1', [req.params.id])
res.send(rows)
} catch (err) {
  res.status(500).json({
      err: err.toString()
  })
}
});




module.exports = router;