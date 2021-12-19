const router = require('express').Router()
const db = require('../db/index')
const helper = require('../utils/helpers')
const AppError = require('../AppError')


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
  console.log(req.session);
  console.log(req.user);
  
  
    const {
      rows
    } = await db.query('SELECT * FROM users WHERE id = $1', [req.user.id])


    res.status(200).send(rows[0])
    
 
}));

router.put('/:id', asyncWrapper(async (req, res, next) => {
const { body } = req
let { field_name, value } = body

field_name = field_name == 'firstName' ? 'first_name' : field_name

const allowedFields = ['first_name', 'email', 'password']

if (allowedFields.indexOf(field_name) == -1) {
  return next(new AppError('Updating this field is not allowed', 401))
}

const query = `UPDATE users SET ${field_name} = $1 WHERE id = $2`

const {
  rows
} = await db.query(query, [value, req.params.id])
res.status(200).send(rows[0])

}))



module.exports = router;