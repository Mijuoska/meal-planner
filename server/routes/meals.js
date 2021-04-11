const express = require('express');
const db = require('../db');
const router = express.Router();




router.get('/', async (req, res, next) => {
    try {
    const { rows } = await db.query(`SELECT meals.id, day, type, assigned_to, users.first_name AS assigned_to_name, users.tag_color AS tag_color, recipe_id, recipes.name AS recipe_name FROM meals 
                                INNER JOIN recipes ON recipes.id = meals.recipe_id
                                INNER JOIN users ON meals.assigned_to = users.id`);
      res.send(rows);
    } catch (err) {
        console.error(err)
        res.status(500).json({err: err.toString()})
    }
  
    
})

router.get('/:id', async (req, res, next) => {
    try {
    const { rows } = await db.query('SELECT * FROM meals WHERE id=$1', [req.params.id]);
      res.send(rows);
    } catch (err) {
        console.error(err)
        res.status(500).json({err: err.toString()})
    }
  
    
})

router.get('/:id/ingredients', async (req, res, next) => {
    try {
    const { rows } = await db.query('SELECT * FROM meals WHERE id=$1', [req.params.id]);
      res.send(rows);
    } catch (err) {
        console.error(err)
        res.status(500).json({err: err.toString()})
    }
  
    
})

router.post('/', async (req, res, next) => {
    const { body } = req
    try {
        const result = await db.query(`INSERT INTO meals (day, type, recipe_id, assigned_to) 
        VALUES ($1, $2, $3, $4) RETURNING *`,
        [body.day, body.type, body.recipe_id, body.assigned_to])
        res.status(201).send(result.rows)
    } catch (err) {
        res.status(500).send({error: err.toString()})
    }
})

router.put('/:id', async (req, res, next) => {
    const { body } = req
    try {
        const result = await db.query(`UPDATE meals SET 
        day = $1, type = $2, recipe_id = $3, assigned_to = $4
        WHERE id = $5 RETURNING *`,
        [body.day, body.type, body.recipe_id, body.assigned_to, req.params.id])
        res.status(200).send(result.rows)
    } catch (err) {
        res.status(500).send({error: err.toString()})

    }

})

router.delete('/:id', async (req, res, next) => {
    try {
        const result = await db.query(`DELETE FROM meals WHERE id = $1`, [req.params.id])
        res.status(204).send(`Record with id ${req.params.id} deleted`)
    } catch (err) {
        res.status(500).send({error: err.toString()})
    }
})

module.exports = router;