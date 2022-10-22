const bcrypt = require('bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const router = require('express').Router()
const QueryBuilder = require('../db/querybuilder')
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
            } = await new QueryBuilder('users').select().addCondition('username', '=', username).exec()
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
    
    const newUserResult = await new QueryBuilder('users')
        .insert({
            username: username,
            first_name: firstName,
            email: email,
            password: passwordHash
        }).returning('id,username, first_name').exec()
    // Step 2: Creating household
    const newUser = newUserResult.rows[0]
    const householdName = `${newUser.first_name}'s household`

    const newHouseholdResult = await new QueryBuilder('households').insert({
        name: householdName,
        members: [newUser.id]
    }).returning('id, name').exec()


    // Step 3: Update user with household id
    const updatedUserResult = await new QueryBuilder('users').update({
        households: [newHouseholdResult.rows[0].id],
    }).addCondition('id', '=', newUser.id)
    .returning('id,username,first_name,password,households').exec()

    const user = updatedUserResult.rows[0]
    req.login(user, function (err) {
        if (err) {
            console.log(err)
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
    } = await new QueryBuilder('users').select('id,first_name,username,password').addCondition('id', '=', req.user.id).exec()

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
        } = await new QueryBuilder('users').update({
            password: passwordHash
        }).addCondition('id', '=', req.user.id).returning('password').exec()


        return res.status(201).send(rows[0])

    }
}))


module.exports = router