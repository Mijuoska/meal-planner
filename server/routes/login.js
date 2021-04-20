const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()
<<<<<<< HEAD
const User = require('../models/user')
=======
>>>>>>> error_handling
const db = require('../db')

router.post('/', async (req, res, next) => {
    const { body } = req
    const { rows } = await db.query(`SELECT username, password FROM users WHERE username = $1`, [body.username])
<<<<<<< HEAD
    let passwordCorrect = ''
    if (user) {
        passwordCorrect = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)
=======
    const user = rows[0]
    let passwordCorrect = ''
    if (user) {
        passwordCorrect = user === null ? false : await bcrypt.compare(body.password, user.password)
>>>>>>> error_handling
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
<<<<<<< HEAD
        id: user._id,
=======
        id: user.id,
>>>>>>> error_handling
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response.status(200).send({
        token,
        username: user.username,
        name: user.name,
<<<<<<< HEAD
        id: user._id
    })

})

module.exports = loginRouter
=======
        id: user.id
    })

   

}) 

module.exports = router
>>>>>>> error_handling
