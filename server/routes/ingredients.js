const express = require('express');
const db = require('../db');
const router = express.Router();
const helper = require('../utils/helpers')

const {
    asyncWrapper
} = helper


router.get('/', asyncWrapper(async (req, res, next) => {
    try {
    const { rows } = await db.query('SELECT id AS value, name AS label FROM ingredients');
    res.send(rows)
} catch (err) {
    next(err)
}
}));


    

module.exports = router