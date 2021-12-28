const express = require('express');
const AppError = require('../AppError');
const db = require('../db');
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
        } = await db.query('SELECT id AS value, name AS label FROM ingredients WHERE household = $1 OR household = NULL', [household]);
        res.send(rows)
    } catch (ex) {
        console.log(ex);

        return next(new AppError('Something went wrong', 500))
    }
}));


router.post('/', asyncWrapper(async (req, res, next) => {
    var {
        body
    } = req
    try {
        const {
            rows
        } = await db.query('INSERT INTO ingredients (name) VALUES($1) RETURNING *', [body.name])
        res.status(200).send(rows);
    } catch (err) {
        next(err)
    }
}))



module.exports = router