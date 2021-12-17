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
       const { rows } = await db.query('SELECT * FROM users WHERE username = $1', [username])
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
           'id': user.id
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


        const userResult = await db.query(`INSERT INTO users 
    (username, first_name, email, password) VALUES($1, $2, $3, $4) RETURNING id, username, first_name`, [username, firstName, email, passwordHash])

        const user = userResult.rows[0]

       req.login(user, function(err) {
           if (err) {
           return next(new AppError('Something went wrong with loggin you in', 500))
           }
           return res.status(201).json({
               id: user.id,
               name: user.first_name,
               username: user.username
           })
       })



    
}))



router.post('/login', passport.authenticate('local'), asyncWrapper(async (req, res, next) => {
    const { user } = req
    console.log(req.user)
    res.status(200).json({id: user.id, 'name': user.first_name})
}))



router.post('/logout', asyncWrapper(async(req, res, next) =>{
    req.logout()
    req.session.destroy()
    res.status(200).json({
        success: `Logged out user`
    })
}))

router.put('/reset_password', asyncWrapper(async(req, res, next) => {
     const {
         body
     } = req


     const {
         rows
     } = await db.query(`SELECT id, first_name, username, password FROM users WHERE id = $1`, [body.user_id])
     const user = rows[0]
     let passwordCorrect = ''
          const {
              old_password
          } = body;

     if (user) {
         passwordCorrect = await bcrypt.compare(old_password, user.password)
     } else {
         return next(new AppError('Invalid user or password', 401))
     }
     if (!passwordCorrect) {
         return next(new AppError('Invalid user or password', 401))
     }

    const { new_password } = body
if (!new_password || new_password.length < 8) {
    return next(new AppError('Please provide a password that is at least 8 characters long', 403))
}

const passwordHash = await bcrypt.hash(new_password, 10)
const { user_id } = body

const { userRows } = await db.query('UPDATE users SET password = $1 WHERE id = $2', [passwordHash, user_id])

res.status(201).send(userRows[0])

}))


module.exports = router