'use strict'
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Thread = use('App/Models/Thread')

class HomepageController {
    async homePage({ view }) {
        let threads = await Thread.query()
            .with('tag')
            .with('user')
            .fetch()
        return view.render('home', { threads })
    }
}

module.exports = HomepageController
