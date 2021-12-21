require('dotenv').config()

const SECRET = process.env.SECRET
const NODE_ENV = process.env.NODE_ENV
const PORT = process.env.PORT
const SESSION_AGE = 600000

module.exports = { SECRET, NODE_ENV, PORT, SESSION_AGE }

