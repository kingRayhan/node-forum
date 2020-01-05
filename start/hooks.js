const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(async () => {
    /** @type {typeof import('@adonisjs/validator/src/Validator')} validator*/
    const Validator = use('Validator')

    /** @type {typeof import('@adonisjs/framework/src/View')} View */
    const View = use('View')

    /**
     * Setup tags global template variable
     */
    /** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
    const Tag = use('App/Models/Tag')
    let tags = await Tag.query()
        .with('threads')
        .fetch()

    View.global('tags', tags)

    View.global('paginationArray', length => {
        return Array.from({ length }).map((page, i) => ++i)
    })

    View.global('log', data => {
        return JSON.stringify(data, undefined, 4)
    })

    /**
     * extending validator
     */
    Validator.extend('exists', async function(data, field, message, args, get) {
        let [Model, primaryKey] = args
        let value = get(data, field)
        let theModel = use(`App/Models/${Model}`)

        let fetched = await theModel.findBy(primaryKey, value)

        if (!fetched) {
            throw message
        }
    })
})
