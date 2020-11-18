const { Model } = require('objection')
const connection = require('../../config/db/connection')

Model.knex(connection)

class User extends Model {
    static get tableName() {
        return 'users'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [],
            properties: {
                id: {type: 'integer'},
                email: {type: 'string'},
                password: {type: 'string'},
                capaPath: {type: 'text'}
            }
        }
    }
}

module.exports = User