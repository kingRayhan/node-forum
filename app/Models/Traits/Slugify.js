'use strict'
const slugify = require('slugify')

class Slugify {
    register(Model) {
        Model.addHook('afterCreate', async thread => {
            if (!thread.title) return

            thread.slug = `${slugify(thread.title, { lower: true })}-${
                thread.id
            }`
            await thread.save()
        })
    }
}

module.exports = Slugify
