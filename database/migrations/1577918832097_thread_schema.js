'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ThreadSchema extends Schema {
    up() {
        this.create('threads', table => {
            table.increments()
            table.string('title')
            table.string('slug').unique()
            table
                .integer('parent_id')
                .unsigned()
                .index()
            table.text('body')
            table
                .integer('user_id')
                .unsigned()
                .index()

            table
                .integer('tag_id')
                .unsigned()
                .index()
            table.timestamp('last_reply_at')
            table.timestamps()

            table.foreign('user_id').references('users.id')
            table.foreign('tag_id').references('tags.id')
        })
    }

    down() {
        this.drop('threads')
    }
}

module.exports = ThreadSchema
