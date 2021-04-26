const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const db = require('../db')
const helper = require('../utils/helpers')

const { asyncWrapper } = helper

router.post('/', asyncWrapper(async (req, res, next) => {
    const { body } = req
    const { rows } = await db.query(`SELECT username, password FROM users WHERE username = $1`, [body.username])
    const user = rows[0]
    let passwordCorrect = ''
    if (user) {
        passwordCorrect = user === null ? false : await bcrypt.compare(body.password, user.password)
    } else {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    if (!passwordCorrect) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user.id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response.status(200).send({
        token,
        username: user.username,
        name: user.name,
        id: user.id
    })

   

})) 

module.exports = router
