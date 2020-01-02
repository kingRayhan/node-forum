'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Thread extends Model {
    static boot() {
        super.boot()

        this.addTrait('Slugify')
    }
}

module.exports = Thread
