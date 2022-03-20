const { Pool, Client } = require('pg')
const fs = require('fs')



const pool = process.env.NODE_ENV == 'dev' ? new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,

    ssl: {
        rejectUnauthorized: false,
        ca: fs.readFileSync(process.env.DB_SERVER_CERTIFICATE).toString(),
        key: fs.readFileSync(process.env.DB_CLIENT_KEY).toString(),
        cert: fs.readFileSync(process.env.DB_CLIENT_CERTIFICATE).toString()
    }
}): new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})
 



module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    },
}