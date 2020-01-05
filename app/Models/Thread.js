'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Thread extends Model {
    static boot() {
        super.boot()
        this.addTrait('Slugify')
    }

    static get dates() {
        return super.dates.concat(['last_reply_at'])
    }

    static scopeFetchAllThreads(query) {
        return query
            .with('tag')
            .with('user')
            .with('replies')
            .with('lastReply')
            .with('lastReply.user')
            .whereNull('parent_id')
            .orderBy('last_reply_at', 'desc')
    }

    user() {
        return this.belongsTo('App/Models/User')
    }

    tag() {
        return this.belongsTo('App/Models/Tag')
    }

    replies() {
        return this.hasMany('App/Models/Thread', 'id', 'parent_id').orderBy(
            'created_at',
            'asc'
        )
    }

    lastReply() {
        return this.hasOne('App/Models/Thread', 'id', 'parent_id')
    }
}

module.exports = Thread
