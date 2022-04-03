const express = require('express');
const AppError = require('../AppError');
const QueryBuilder = require('../db/querybuilder')
const router = express.Router();
const helper = require('../utils/helpers')

const {
    asyncWrapper
} = helper


router.get('/', asyncWrapper(async (req, res, next) => {
    const household = req.user ? req.user.households[0] : ''

    try {
        const {
            rows
        } = await new QueryBuilder('ingredients').select('id AS value, name AS label')
        .addCondition('household', '=', household)
        .addOrCondition('household', 'IS NULL').exec()

        res.send(rows)
    } catch (ex) {
        console.log(ex);

        return next(new AppError('Something went wrong with fetching ingredients', 500))
    }
}));


router.post('/', asyncWrapper(async (req, res, next) => {
    var {
        body
    } = req
    try {
           const { rows } = await
            new QueryBuilder('ingredients').insert({
                name: body.name,
                household: req.user.households[0]
            }).returning('*').exec()

        res.status(200).send(rows);
    } catch (err) {
        console.log(err)
        next(new AppError('Something went wrong with saving new ingredients', 500))
    }
}))



module.exports = router