'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Thread = use('App/Models/Thread')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

const Env = use('Env')

class ProfileController {
    async index({ view, request, params }) {
        let user = await User.findBy('username', params.username)

        let threads = await Thread.query()
            .fetchAllThreads()
            .where('user_id', '=', user.id)
            .paginate(request.input('page', 1), Env.get('THREAD_SHOW_LIMIT'))
        return view.render('profile.index', { threads, user })
    }
}

module.exports = ProfileController
