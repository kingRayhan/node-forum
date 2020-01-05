'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Thread = use('App/Models/Thread')

const Env = use('Env')

class HomepageController {
    async homePage({ view, request }) {
        let threads = await Thread.query()
            .fetchAllThreads()
            .paginate(request.input('page', 1), Env.get('THREAD_SHOW_LIMIT'))
        return view.render('home', { threads })
    }
}

module.exports = HomepageController
