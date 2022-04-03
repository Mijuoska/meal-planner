const express = require('express');
const AppError = require('../AppError');
const QueryBuilder = require('../db/querybuilder')
const router = express.Router();
const helpers = require('../utils/helpers')
const middleware = require('../middleware')

const {
    asyncWrapper
} = helpers

const { checkIfLoggedIn } = middleware

router.get('/', checkIfLoggedIn, asyncWrapper(async (req, res, next) => {    
    const qb = new QueryBuilder('meals')
    
    const household = req.user ? req.user.households[0] : ''
    try {

        const {
            rows
        } = await qb.select(`meals.id, day, type, assigned_to, users.first_name 
                AS assigned_to_name, users.tag_color AS tag_color,
                 recipe_id, recipes.name AS recipe_name`)
            .innerJoin('recipes','recipes.id', 'meals.recipe_id')
            .innerJoin('users','users.id', 'meals.assigned_to')
            .addCondition('household','=', household)
            .exec();

        res.status(200).send(rows);

    } catch (ex) {
        console.log(ex);
        return next(new AppError('Something went wrong', 500))
    }
}))

router.get('/:id', asyncWrapper(async (req, res, next) => {
    const qb = new QueryBuilder('meals')

    const {
        rows
    } = await qb.select().addCondition('id','=', req.params.id).exec()

    res.send(rows);

}))

router.get('/:id/ingredients', asyncWrapper(async (req, res, next) => {
    const qb = new QueryBuilder('meals')

    const {
        rows
    } = await qb.select().addCondition('id','=', req.params.id).exec()
    res.send(rows);

}))

router.post('/', asyncWrapper(async (req, res, next) => {
    const qb = new QueryBuilder('meals')


    try {
        const household = req.user ? req.user.households[0] : ''



    const {
        body
    } = req

            const {
                day,
                type,
                recipe_id,
                assigned_to
            } = body

    const result = await qb.insert({
        day: day,
        type: type,
        recipe_id: recipe_id,
        assigned_to: assigned_to,
        household: household
    }).returning('*').exec()
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

    const { day, type, recipe_id, assigned_to } = body
    const qb = new QueryBuilder('meals');
    
    const result = await qb.update({
            day,
            type,
            recipe_id,
            assigned_to
        })
        .addCondition('id','=',req.params.id)
        .returning('*')
        .exec()
    return res.status(200).send(result.rows)


}))

router.delete('/:id', asyncWrapper(async (req, res, next) => {
    const qb = new QueryBuilder('meals');
    await qb.delete().addCondition('id','=',req.params.id).exec()
    res.status(204).send(`Record with id ${req.params.id} deleted`)
}))

module.exports = router;