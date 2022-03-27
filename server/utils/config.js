require('dotenv').config()

const SECRET = process.env.SECRET
const NODE_ENV = process.env.NODE_ENV
const PORT = process.env.PORT
const SESSION_AGE = 600000
const DATABASE_URL = process.env.DATABASE_URL

module.exports = { SECRET, NODE_ENV, PORT, SESSION_AGE, DATABASE_URL }

