var express = require('express');
var router = express.Router();
const db = require('../db/index')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const {
      rows
    } = await db.query('SELECT id, first_name FROM users')
    res.send(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({
      err: err.toString()
    })
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const {
      rows
    } = await db.query('SELECT * FROM users WHERE id = $1', [req.params.id])
    res.send(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({
      err: err.toString()
    })
  }
});


router.post('/', async(req, res, next) => {
  const { body } = req
  try {
    const { rows } = await db.query(`INSERT INTO users 
    (username, password) VALUES ($1, $2) RETURNING username`, [body.username, body.password])
  res.status(201).send(rows)
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong with creating a user',
      err: err.toString()
    })
    console.log(err)
  }
})

module.exports = router;