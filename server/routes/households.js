const express = require('express');
const db = require('../db/index')
const router = express.Router();
const helper = require('../utils/helpers')

const {
    asyncWrapper
} = helper


router.get('/', asyncWrapper(async (req, res, next) => {

    if (req.query.user) {
    const { user } = req.query
   
        const { rows } = await db.query(`SELECT * FROM households WHERE $1 = any(members)`, [user])
        res.send(rows)
    } else {
      
         const {
            rows
             } = await db.query(`SELECT * FROM households`)
             res.send(rows)
         
    }
}))

router.get('/:id', asyncWrapper(async (req, res, next) => {
   
        const { rows } = await db.query(`SELECT * FROM households WHERE id = $1`, [req.params.id])
        res.send(rows)
    
}))

router.post('/', asyncWrapper(async (req, res, next) => {
    const { name, members } = req.body
  
    const { rows } = await db.query(`INSERT INTO
     households (name, members) values ($1, $2) RETURNING id, name`, 
     [name, members])
     res.status(201).send(rows)



}))

module.exports = router 