'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Thread extends Model {
    static boot() {
        super.boot()
        this.addTrait('Slugify')
    }

    // static scopeWithReplies(query) {
    //     return query
    //         .with('replies')
    //         .with('replies.replies')
    //         .with('replies.replies.replies')
    // }

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
}

module.exports = Thread
