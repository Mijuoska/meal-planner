const express = require('express');
const AppError = require('../AppError');
const db = require('../db');
const router = express.Router();
const helper = require('../utils/helpers')

const {
    asyncWrapper
} = helper


router.get('/', asyncWrapper(async (req, res, next) => {

    try {
        const { rows } = await db.query('SELECT * FROM units');
        return res.status(200).send(rows);
        
    } catch (ex) {
        console.log(ex);
        return next(new AppError('Something went wrong with fetching units', 500))
    }

}));

module.exports = router