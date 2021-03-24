const { Pool, Client } = require('pg')

const connectInfo = {
    user: 'postgres',
    host: 'localhost',
    database: 'mealplanner',
    password: 'G0r3b0nm0',
    port: 5432,
}

const pool = new Pool(connectInfo);


module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    },
}