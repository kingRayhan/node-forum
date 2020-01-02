'use strict'
const Tag = use('App/Models/Tag')

class HomepageController {
    async homePage({ view }) {
        const tags = await Tag.all()
        console.log(tags.toJSON())
        return view.render('home', { tags })
    }
}

module.exports = HomepageController
