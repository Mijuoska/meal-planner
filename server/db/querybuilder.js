const db = require('./index')
const config = require('../utils/config')

module.exports = class QueryBuilder {
    constructor(table) {
        this.table = table;
        this.query = '';
        this.conditions = 0;
        this.fields = []
        this.values = []
        this.logQueries = config.LOG_QUERIES
    }

    

    select(fields) {
        this.fields = fields ? fields.split(',') : []
        this.query = `SELECT ${fields ? fields : '*'} FROM ${this.table}`
        return this
    }



    whereSubquery(field, operator, subquery) {
        this.query = this.query + ` WHERE ${field} ${operator} ${subquery}`
        return this
    }

    

    addCondition(field, operator, value) {
        if (this.conditions == 0) {
        this.query = this.query + ` WHERE ${this._transformQuery(field, operator, value)}`
        }  else if (this.conditions > 0) {
        this.query = `${this.query} AND ${this._transformQuery(field, operator, value)}`
        }
        this.conditions += 1
        
        return this
    }


    addOrCondition(field, operator, value) {
         this.query = `${this.query} OR ${this._transformQuery(field, operator, value)}`
         return this
         }
    
    innerJoin(tableToJoin, fieldToJoinOn, fieldToJoinWith) {
        this.query = this.query + ` INNER JOIN ${tableToJoin} ON ${fieldToJoinOn} = ${fieldToJoinWith}`
        return this
    }


    insert(valuesMap) {
        const fields = Object.keys(valuesMap).join()
        this.values = Object.values(valuesMap)
        this.query = `INSERT INTO ${this.table} (${fields}) VALUES (${this._getParams(this.values.length).join()})`
        return this
    }

    update(valuesMap) {
        const fields = Object.keys(valuesMap)
        const values = Object.values(valuesMap)
        this.values = values;
        let updatesArray = [];
        fields.forEach((field, index) => {
            updatesArray.push(`${field} = $${index + 1}` )
        })
        this.query = `UPDATE ${this.table} SET ${updatesArray.join()}`
        return this
    }

    delete() {
        this.query = `DELETE FROM ${this.table}`
        return this
    }

    returning(fields) {
        this.query = `${this.query} RETURNING ${fields ? fields : '*'}`
        return this
    }


    getAsSubquery() {
        let query = this.query
        return `(${this._transposeValues(query)})`
    }

    _transformQuery(field, operator, value) {
        if (value) {
            this.values.push(value)
        }
        if (operator == 'IS NULL') {
            return `${field} ${operator}`
        }
        let param = `$${this.values.length}`;

        if (field.startsWith('ANY')) {
            return `${param} ${operator} ${field}`
        } else {
            return `${field} ${operator} ${param}`
        }
    }

    _transposeValues(query) {
        let params = query.match(/\$\d/)
        params.forEach((param, index) => {
             query = query.replace(param, this.values[index])
          })
        return query;
    }

    _getParams(numOfValues) {
        let result = [];
        for (let i = 1; i <= numOfValues; i++) {
            result.push('$' + i)
        }
        return result
    }

    async exec(query, values) {
        if (query) {
            this.query = query
        }
        if (values) {
            this.values = values
        }
        if (this.logQueries) {
            console.log(this._transposeValues(this.query))
        }
        return await db.query(this.query, this.values)
        
    }

}