const { Pool, Client } = require('pg')
const fs = require('fs')



const pool = process.env.NODE_ENV == 'dev' ? new Pool({
    connectionString: process.env.DATABASE_URL,


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