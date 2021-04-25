const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const db = require('../db/index')


router.post('/register', async (req, res, next) => {
    const {
        body
    } = req
    const {
        username,
        firstName,
        email,
        password
    } = body

    if (!username) {
        return res.status(400).send('Please provide a username')
    }
    if (!password || password.length < 6) {
        return res.status(400).send('Please provide a password of at least 6 characters long')
    }



    const saltRounds = 10
    const passwordHash =  await bcrypt.hash(password, saltRounds)


    try {
        const {
            rows
        } = await db.query(`INSERT INTO users 
    (username, first_name, email, password) VALUES($1, $2, $3, $4) RETURNING id, username, first_name`, [username, firstName, email, passwordHash])

        const user = rows[0]

        const userForToken = {
            username: user.username,
            id: user.id,
        }

        const token = jwt.sign(userForToken, process.env.SECRET)

        res.status(201).json({
            token,
            username: user.username,
            name: user.first_name,
            id: user.id
        })
    } catch (err) {
        next(err)
    }
})



router.post('/login', async (req, res, next) => {
    const {
        body
    } = req
    const {
        rows
    } = await db.query(`SELECT id, first_name, username, password FROM users WHERE username = $1`, [body.username])
    const user = rows[0]
    let passwordCorrect = ''
    if (user) {
        passwordCorrect = user === null ? false : await bcrypt.compare(body.password, user.password)
    console.log(passwordCorrect)
    } else {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }

    if (!passwordCorrect) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user.id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    res.status(200).json({
        token,
        username: user.username,
        name: user.first_name,
        id: user.id
    })



})

module.exports = router