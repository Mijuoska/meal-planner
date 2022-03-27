const {
    Pool,
    Client
} = require('pg')

const pgSession = require('connect-pg-simple');

 class Session {
    constructor() { 
    this.pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    }
     sessionHandler(session) {
        const pgs = pgSession(session);
        return new pgs({
            conString: process.env.DATABASE_URL,
            pool: this.pool,
            schemaName: 'public',
            tableName: 'session',
        });
    }
}

module.exports = Session

