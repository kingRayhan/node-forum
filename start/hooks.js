const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(async () => {
    /** @type {typeof import('@adonisjs/validator/src/Validator')} validator*/
    const Validator = use('Validator')

    /** @type {typeof import('@adonisjs/framework/src/View')} View */
    const View = use('View')

    /**
     * Setup tags global template variable
     */
    const Tag = use('App/Models/Tag')
    let tags = await Tag.all()
    View.global('tags', tags)

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
