'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tag extends Model {
    threads() {
        return this.hasMany('App/Models/Thread')
    }
}

module.exports = Tag
