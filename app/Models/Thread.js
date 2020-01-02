'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Thread extends Model {
    static boot() {
        super.boot()
        this.addTrait('Slugify')
    }

    static get primaryKey() {
        return 'slug'
    }

    user() {
        return this.belongsTo('App/Models/User')
    }

    tag() {
        return this.belongsTo('App/Models/Tag')
    }
}

module.exports = Thread
