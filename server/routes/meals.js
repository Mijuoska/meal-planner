const express = require('express');
const AppError = require('../AppError');
const db = require('../db');
const router = express.Router();
const helpers = require('../utils/helpers')

const {
    asyncWrapper
} = helpers

router.get('/', asyncWrapper(async (req, res, next) => {

    const household = req.user ? req.user.households[0] : ''
    try {
        const {
            rows
        } = await db.query(`SELECT meals.id, day, type, assigned_to, users.first_name 
    AS assigned_to_name, users.tag_color AS tag_color, recipe_id, recipes.name AS recipe_name FROM meals 
                                INNER JOIN recipes ON recipes.id = meals.recipe_id
                                INNER JOIN users ON meals.assigned_to = users.id
                                WHERE household = $1`, [household]);

        res.status(200).send(rows);

    } catch (ex) {
        console.log(ex);
        return next(new AppError('Something went wrong', 500))
    }
}))

router.get('/:id', asyncWrapper(async (req, res, next) => {

    const {
        rows
    } = await db.query('SELECT * FROM meals WHERE id=$1', [req.params.id]);
    res.send(rows);

}))

router.get('/:id/ingredients', asyncWrapper(async (req, res, next) => {

    const {
        rows
    } = await db.query('SELECT * FROM meals WHERE id=$1', [req.params.id]);
    res.send(rows);

}))

router.post('/', asyncWrapper(async (req, res, next) => {
    
    const household = req.user ? req.user.households[0] : ''

    try {

    const {
        body
    } = req
    const result = await db.query(`INSERT INTO meals (day, type, recipe_id, assigned_to, household) 
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [body.day, body.type, body.recipe_id, body.assigned_to, household])
    return res.status(201).send(result.rows)
    } catch (ex) {
        console.log(ex);
        return next(new AppError('Something went wrong with creating a new meal', 500))
        
    }
}))

router.put('/:id', asyncWrapper(async (req, res, next) => {
    const {
        body
    } = req

    const result = await db.query(`UPDATE meals SET 
        day = $1, type = $2, recipe_id = $3, assigned_to = $4
        WHERE id = $5 RETURNING *`,
        [body.day, body.type, body.recipe_id, body.assigned_to, req.params.id])
    return res.status(200).send(result.rows)


}))

router.delete('/:id', asyncWrapper(async (req, res, next) => {
    await db.query(`DELETE FROM meals WHERE id = $1`, [req.params.id])
    res.status(204).send(`Record with id ${req.params.id} deleted`)
}))

module.exports = router;