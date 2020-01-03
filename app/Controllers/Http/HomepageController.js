'use strict'
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Thread = use('App/Models/Thread')

class HomepageController {
    async homePage({ view }) {
        let threads = await Thread.query()
            .with('tag')
            .with('user')
            // .order('id', 'desc')
            .fetch()

        return view.render('home', { threads })
    }
}

module.exports = HomepageController
