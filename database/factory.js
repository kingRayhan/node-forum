'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/Tag', faker => {
    const name = faker.word()
    return {
        name: name,
        slug: name
    }
})

Factory.blueprint('App/Models/Thread', faker => {
    let tagIds = [1, 2, 3, 4, 5]
    // let userIds = [6, 7, 8]
    return {
        title: faker.paragraph({ sentences: 1 }),
        body: faker.paragraph(),
        tag_id: tagIds[Math.floor(Math.random() * tagIds.length)],
        // user_id: userIds[Math.floor(Math.random() * userIds.length)]
        user_id: 1
    }
})
