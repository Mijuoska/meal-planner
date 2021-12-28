const bcrypt = require('bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const router = require('express').Router()
const db = require('../db/index')
const helper = require('../utils/helpers')
const AppError = require('../AppError')

const {
    asyncWrapper
} = helper


passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const {
                rows
            } = await db.query('SELECT * FROM users WHERE username = $1', [username])
            let user

            if (rows.length == 0) {
                return done(null, false, {
                    message: 'Incorrect username.'
                });

            } else {
                user = rows[0]
            }

            let passwordCorrect = await bcrypt.compare(password, user.password)
            if (!passwordCorrect) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }

            const sessionUser = {
                'first_name': user.first_name,
                'username': user.username,
                'id': user.id,
                'households': user.households
            }
            return done(null, sessionUser);


        } catch (ex) {
            return done(ex)
        }
    }
))

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});



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

    const passwordHash = await bcrypt.hash(password, 10)

    // Step 1: creating user
    const newUserResult = await db.query(`INSERT INTO users 
    (username, first_name, email, password) VALUES($1, $2, $3, $4) 
    RETURNING id, username, first_name`, [username, firstName, email, passwordHash])

    // Step 2: Creating household
    const newUser = newUserResult.rows[0]
    const householdName = `${newUser.first_name}'s household`
    const newHouseholdResult = await db.query(`INSERT INTO
     households (name, members) values ($1, $2) RETURNING id, name`,
        [householdName, [newUser.id]])

    // Step 3: Update user with household id
    const updatedUserResult = await db.query(`UPDATE users SET households = $1 
     WHERE id = $2 RETURNING id, username, first_name, households`, [
        [newHouseholdResult.rows[0].id], newUser.id
    ])

    const user = updatedUserResult.rows[0]
    req.login(user, function (err) {
        if (err) {
            return next(new AppError('Something went wrong with logging you in', 500))
        }
        return res.status(201).json({
            id: user.id,
            name: user.first_name,
            username: user.username,
            households: user.households[0]
        })
    })




}))



router.post('/login', passport.authenticate('local'), asyncWrapper(async (req, res, next) => {
    const {
        user
    } = req
    res.status(200).json({
        id: user.id,
        name: user.first_name,
        household: user.households[0]
    })
}))



router.post('/logout', asyncWrapper(async (req, res, next) => {
    req.logout()
    req.session.destroy()
    res.status(200).json({
        success: `Logged out user`
    })
}))

router.put('/reset_password', asyncWrapper(async (req, res, next) => {
    const {
        body
    } = req


    const {
        rows
    } = await db.query(`SELECT id, first_name, username, password FROM users WHERE id = $1`, [req.user.id])
    const user = rows[0]

    if (user) {

        const {
            new_password
        } = body
        if (!new_password || new_password.length < 8) {
            throw new AppError('Please provide a password that is at least 8 characters long', 403)
        }

        const passwordHash = await bcrypt.hash(new_password, 10)

        const {
            rows
        } = await db.query('UPDATE users SET password = $1 WHERE id = $2 RETURNING password', [passwordHash, req.user.id])

        return res.status(201).send(rows[0])

    }
}))


module.exports = router