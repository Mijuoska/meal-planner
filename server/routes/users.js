var express = require('express');
var router = express.Router();
const db = require('../db/index')

/* GET users listing. */
router.get('/', async (req, res, next) => {
try {
const { rows } = await db.query('SELECT * FROM users')
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
const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [req.params.id])
res.send(rows)
} catch (err) {
console.error(err)
res.status(500).json({
  err: err.toString()
})
}
});

module.exports = router;
