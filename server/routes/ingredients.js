const express = require('express');
const db = require('../db');
const router = express.Router();
const helper = require('../utils/helpers')

const {
    asyncWrapper
} = helper


router.get('/', asyncWrapper(async (req, res, next) => {
    try {
    const { rows } = await db.query('SELECT id AS value, name AS label FROM ingredients WHERE household = $1', [req.user.households[0]]);
    res.send(rows)
} catch (err) {
    next(err)
}
}));


router.post('/', asyncWrapper(async (req, res, next) => {
    var { body } = req
    try {
        const { rows } = await db.query('INSERT INTO ingredients (name) VALUES($1) RETURNING *', [body.name])
        res.status(200).send(rows);
    } catch(err) {
        next(err)
    }
}))

    

module.exports = router