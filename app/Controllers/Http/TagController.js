'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Env = use('Env')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Thread = use('App/Models/Thread')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Tag = use('App/Models/Tag')

/**
 * Resourceful controller for interacting with tags
 */
class TagController {
    /**
     * Show a list of all tags.
     * GET tags
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, response, view }) {}

    /**
     * Render a form to be used for creating a new tag.
     * GET tags/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, response, view }) {}

    /**
     * Create/save a new tag.
     * POST tags
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response }) {}

    /**
     * Display a single tag.
     * GET tags/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {}

    /**
     * Render a form to update an existing tag.
     * GET tags/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {}

    /**
     * Update tag details.
     * PUT or PATCH tags/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {}

    /**
     * Delete a tag with id.
     * DELETE tags/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {}

    async ThreadsOfTag({ params, request, response, view }) {
        let { id: tag_id } = await Tag.findBy('slug', params.tag_slug)

        let threads = await Thread.query()
            .fetchAllThreads()
            .where('tag_id', '=', tag_id)
            .paginate(request.input('page', 1), Env.get('THREAD_SHOW_LIMIT'))

        return view.render('home', {
            threads
        })
    }
}

module.exports = TagController
