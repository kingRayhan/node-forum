'use strict'

/*
|--------------------------------------------------------------------------
| TagSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class TagSeeder {
    async run() {
        // let data = await Database.table('tags')
        const tags = await Factory.model('App/Models/Tag').createMany(5)
    }
}

module.exports = TagSeeder
