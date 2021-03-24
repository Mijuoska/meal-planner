const express = require('express');
const db = require('../db');
const router = express.Router();




router.get('/', async (req, res, next) => {
    try {
    const { rows } = await db.query('SELECT * FROM meals');
      res.send(rows);
    } catch (err) {
        console.error(err)
        res.status(500).json({err: err.toString()})
    }
  
    
})

module.exports = router;