const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const db = require('../db/index')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const {
      rows
    } = await db.query('SELECT id, first_name FROM users')
    res.send(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({
      err: err.toString()
    })
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const {
      rows
    } = await db.query('SELECT * FROM users WHERE id = $1', [req.params.id])
    res.send(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({
      err: err.toString()
    })
  }
});


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
  const passwordHash = bcrypt.hash(password, saltRounds)


  try {
    const {
      rows
    } = await db.query(`INSERT INTO users 
    (username, first_name, email, password) VALUES($1, $2) RETURNING id, username, name`, [username, firstName, email, passwordHash])

    const user = rows[0]

    const userForToken = {
      username: user.username,
      id: user.id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    res.status(201).send({
      token,
      username: user.username,
      name: user.name,
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
  } = await db.query(`SELECT id, name, username, password FROM users WHERE username = $1`, [body.username])
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



})



module.exports = router;