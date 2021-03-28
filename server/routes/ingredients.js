const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
    const { rows } = await db.query('SELECT id AS value, name AS label FROM ingredients');
    res.send(rows)
} catch (err) {
    console.error(err)
    res.status(500).json({error: err})
}
});


    

module.exports = router