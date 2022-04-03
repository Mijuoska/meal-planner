const express = require('express');
const QueryBuilder = require('../db/querybuilder')
const router = express.Router();
const helper = require('../utils/helpers')

const {
    asyncWrapper
} = helper


router.get('/', asyncWrapper(async (req, res, next) => {
const qb = new QueryBuilder('households');
    if (req.query.user) {
    const { user } = req.query

   
        const {
            rows
        } = await qb.select().addCondition('any(members)', '=', user).exec()

        res.send(rows)
    } else {
      
         const {
            rows
             } = await qb.select().exec()
             res.send(rows)
         
    }
}))

router.get('/:id', asyncWrapper(async (req, res, next) => {

        const {
            rows
        } = await qb.select().addCondition('id', '=', req.params.id).exec()
        res.send(rows)
    
}))

router.post('/', asyncWrapper(async (req, res, next) => {
    const { name, members } = req.body

    const {
        rows
    } = await qb.insert({
        name: name,
        members: members
    }).returning('*').exec()

     res.status(201).send(rows[0])



}))

module.exports = router 