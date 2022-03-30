const db = require('./index')

module.exports = class QueryBuilder {
    constructor(table) {
        this.table = table;
        this.query = '';
        this.fields = []
        this.values = []
    }

    select(fields) {
        this.fields = fields.split(',')
        this.query = `SELECT ${fields ? fields : '*'} FROM ${this.table}`
        return this
    }

    

    where(field, value) {
        const isAny = field.startsWith('ANY')
        const param = `$${this.values.length + 1}`;
        this.query = !isAny ? this.query + ` WHERE ${field} = ${param}` : this.query + ` WHERE $1 = ${field}`
        this.values.push(value)
        return this
    }

    addAndCondition(field, operator, value) {
        this.query = `${this.query} AND ${field} ${operator} $1`
        this.values.push(value)
        return this
    }

    addOrCondition(field, operator, value) {
         this.query = `${this.query} OR ${field} ${operator} $1`
         this.values.push(value)
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

    applyFunction(functionName, applyToField) {
        this.query = this.query.replace(applyToField, `${functionName}(${applyToField})`)
        return this
    }

    isSubquery() {
        this.query = `(${this.query})`
        return this
    }

    // get query() {
    //     return this.query
    // }

    // set query() {

    // }

    _getParams(numOfValues) {
        let result = [];
        for (let i = 1; i <= numOfValues; i++) {
            result.push('$' + i)
        }
        return result
    }

    async exec() {
        console.log(this.query)
        return await db.query(this.query, this.values)
        
    }

}