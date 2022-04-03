const router = require('express').Router()
const QueryBuilder = require('../db/querybuilder')
const helper = require('../utils/helpers')
const AppError = require('../AppError')


const {
  asyncWrapper
} = helper


/* GET users listing. */
router.get('/', asyncWrapper(async (req, res, next) => {
  const qb = new QueryBuilder('users')

  try {
    const {
      rows 
    }  = await qb.select('id,first_name,tag_color')
      .addCondition('ANY(households)','=', req.user.households[0])
      .exec()
    res.send(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({
      err: err.toString()
    })
  }
}));

router.get('/:id', asyncWrapper(async (req, res, next) => {
    const qb = new QueryBuilder('users')

    try {

    const {
      rows
    } = await qb.select('first_name,username,password,email,households,households.name AS household_name')
      .innerJoin('households','users.households[1]', 'households.id')
      .addCondition('users.id','=',req.params.id)
      .exec()
    
    res.status(200).send(rows[0])

    } catch (ex) {
       console.log(ex)
       return next(new AppError('Something went wrong with fetching user', 500))

    }
 
}));

router.put('/:id', asyncWrapper(async (req, res, next) => {
    const qb = new QueryBuilder('users')

  const {
    body
  } = req
  
  let {
    field_name,
    value
  } = body

  field_name = field_name == 'firstName' ? 'first_name' : field_name

  const allowedFields = ['first_name', 'email', 'password', 'households']

  if (allowedFields.indexOf(field_name) == -1) {
    return next(new AppError('Updating this field is not allowed', 401))
  }

try {  

const {
  rows
} = qb.update({
  field_name: value
}).addCondition('id', '=', req.params.id).returning('id, username, first_name, households')
.exec()

res.status(200).send(rows[0])
} catch (ex) {
  console.log(ex);
  return next(new AppError('Something went wrong with updating the user', 500))
  
}
}))



module.exports = router;