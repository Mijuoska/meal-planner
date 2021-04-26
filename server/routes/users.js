const router = require('express').Router()
const db = require('../db/index')
const helper = require('../utils/helpers')

const {
  asyncWrapper
} = helper

/* GET users listing. */
router.get('/', asyncWrapper(async (req, res, next) => {
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
}));

router.get('/:id', asyncWrapper(async (req, res, next) => {
 
    const {
      rows
    } = await db.query('SELECT * FROM users WHERE id = $1', [req.params.id])
    res.send(rows)
 
}));



module.exports = router;