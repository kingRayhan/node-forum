'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddParentIdToThreadsSchema extends Schema {
    up() {
        this.table('threads', table => {
            table
                .integer('thread_parent_id')
                .unsigned()
                .index()
        })
    }

    down() {
        this.table('threads', table => {
            table.dropColumn('thread_parent_id')
        })
    }
}

module.exports = AddParentIdToThreadsSchema
