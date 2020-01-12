'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const md5 = require('md5')

class User extends Model {
    static get computed() {
        return ['avater']
    }

    static boot() {
        super.boot()

        /**
         * A hook to hash the user password before saving
         * it to the database.
         */
        this.addHook('beforeSave', async userInstance => {
            if (userInstance.dirty.password) {
                userInstance.password = await Hash.make(userInstance.password)
            }
        })
    }

    /**
     * A relationship on tokens is required for auth to
     * work. Since features like `refreshTokens` or
     * `rememberToken` will be saved inside the
     * tokens table.
     *
     * @method tokens
     *
     * @return {Object}
     */
    tokens() {
        return this.hasMany('App/Models/Token')
    }

    threads() {
        return this.hasMany('App/Models/Thread')
    }

    getAvater({ email }) {
        const $mail = email.toLowerCase()
        return `https://www.gravatar.com/avatar/${md5($mail)}?s=300&d=mm`
    }
}

module.exports = User
