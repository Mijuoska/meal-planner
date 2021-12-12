const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = require('express').Router()
const db = require('../db/index')
const helper = require('../utils/helpers')
const AppError = require('../AppError')

const {
    asyncWrapper
} = helper


router.post('/register', asyncWrapper(async (req, res, next) => {
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
        return next(new AppError('Please provide a username', 403))
    }
    if (!password || password.length < 8) {
        return next(new AppError('Please provide a password that is at least 8 characters long', 403))
    }

    const passwordHash =  await bcrypt.hash(password, process.env.SALT_ROUNDS)



        const userResult = await db.query(`INSERT INTO users 
    (username, first_name, email, password) VALUES($1, $2, $3, $4) RETURNING id, username, first_name`, [username, firstName, email, passwordHash])

        const user = userResult.rows[0]

        const userForToken = {
            username: user.username,
            userId: user.id
        }

        const token = jwt.sign(userForToken, process.env.SECRET)


        res.status(201).json({
          token, 
          name: user.first_name,
          username: user.username
        })
    
}))



router.post('/login', asyncWrapper(async (req, res, next) => {
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
    } else {
        return next(new AppError('Invalid username or password',401))
    }

    if (!passwordCorrect) {
        return next(new AppError('Invalid username or password', 401))
    } 

const userForToken = {
    username: user.username,
    userId: user.id
}

const token = jwt.sign(userForToken, process.env.SECRET)

    res.status(200).json(
        {token, 
            name: user.first_name, 
            username: user.username
        })

}))


router.post('/logout', asyncWrapper(async(req, res, next) =>{
    req.session.destroy()
    res.status(200).json({
        success: `Logged out user`
    })
}))

module.exports = router