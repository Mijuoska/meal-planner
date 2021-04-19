const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')
const db = require('../db')

router.post('/', async (req, res, next) => {
    const { body } = req
    const { rows } = await db.query(`SELECT username, password FROM users WHERE username = $1`, [body.username])
    let passwordCorrect = ''
    if (user) {
        passwordCorrect = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)
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
        id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response.status(200).send({
        token,
        username: user.username,
        name: user.name,
        id: user._id
    })

})

module.exports = loginRouter
