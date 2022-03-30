const { Pool, Client } = require('pg')
const fs = require('fs')
const config = require('../utils/config')

const { NODE_ENV, DATABASE_URL } = config

const pool = NODE_ENV == 'dev' ? new Pool({
    connectionString: DATABASE_URL,


    ssl: {
        rejectUnauthorized: false,
        ca: fs.readFileSync(process.env.DB_SERVER_CERTIFICATE).toString(),
        key: fs.readFileSync(process.env.DB_CLIENT_KEY).toString(),
        cert: fs.readFileSync(process.env.DB_CLIENT_CERTIFICATE).toString()
    }
}): new Pool({
    connectionString: DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})
 



module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    },
}