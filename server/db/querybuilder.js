const db = require('./db')

module.exports = class QueryBuilder {
    constructor(table) {
        this.table = table;
        this.query = '';
        this.values = []
    }

    select(fields) {
        this.query = `SELECT ${fields ? fields : '*'} FROM ${this.table}`
        return this
    }

    where(field, operator, value) {
        this.query = this.query + ` WHERE ${field} ${operator} $1`
        this.values.push(value)
        return this
    }

    addCondition(field, operator, value) {
        this.query = `${this.query} AND ${field} ${operator} $1`
        this.values.push(value)
    }

    addOrCondition(field, operator, value) {
         this.query = `${this.query} OR ${field} ${operator} $1`
         this.values.push(value)
         }
    
    innerJoin(joinTable1, joinField1, joinTable2, joinField2) {
        this.query = `INNER JOIN ${joinTable1} ON ${joinTable1}.${joinField1} = ${joinTable2}.${joinField2}`
    }


    insert(fields, values) {
        this.query = `INSERT INTO ${this.table} (${fields} VALUES (${this._getValueTemplates(values.length).join()})`
        this.values = values;
        return this
    }

    update(fields, values) {
        this.values = values;
        let updatesArray = [];
        fields.split(',').forEach((field, index) => {
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

    _getValueTemplates(numOfValues) {
        let result = [];
        for (let i = 0; i < numOfValues.length; i++) {
            result.push('$' + i)
        }
        return result
    }

    async exec() {
        return await db.query(this.query, this.values)
        
    }

}