'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @typedef {import('@adonisjs/session/src/Session')} Session*/
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} Auth*/

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Thread = use('App/Models/Thread')

const Env = use('Env')
const moment = require('moment')

const { validateAll } = use('Validator')
/**
 * Resourceful controller for interacting with threads
 */
class ThreadController {
    /**
     * Show a list of all threads.
     * GET threads
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, response, view }) {}

    /**
     * Render a form to be used for creating a new thread.
     * GET threads/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, response, view }) {
        return view.render('threads.create')
    }

    /**
     * Create/save a new thread.
     * POST threads
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {Session} ctx.session
     * @param {Auth} ctx.auth
     */

    async store({ request, response, session, auth }) {
        const valididation = await validateAll(
            request.all(),
            {
                title: 'required|min:5',
                tag: 'required|exists:Tag,id',
                body: 'required|min:25'
            },
            {
                required: `{{field}} is required`,
                'title.min': 'Title must be more than 5 characters',
                exists: `Tag doesn't exists`,
                'body.min': `Body must be more than 25 characters.`
            }
        )
        if (valididation.fails()) {
            session.withErrors(valididation.messages()).flashAll()
            return response.redirect('back')
        }
        const thread = new Thread()
        const { title, body, tag: tag_id } = request.all()
        thread.fill({ title, body, tag_id, user_id: auth.user.id })

        await thread.save()
        session.flash({ msg: 'You have created a thread successfully!!' })
        return response.route('homePage')
    }

    /**
     * Display a single thread.
     * GET threads/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {
        let { id: slug } = params
        let thread = await Thread.query()
            .where('slug', '=', slug)
            .with('user')
            .with('tag')
            .with('replies')
            .with('replies.user')
            .firstOrFail()
        return view.render('threads.show', { thread: thread.toJSON() })
    }

    /**
     * Render a form to update an existing thread.
     * GET threads/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {}

    /**
     * Update thread details.
     * PUT or PATCH threads/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {}

    /**
     * Delete a thread with id.
     * DELETE threads/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {}

    /**
     * Store a child Thread
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {Session} ctx.session
     * @param {Auth} ctx.auth
     */
    async storeChildThread({ params, response, request, session, auth }) {
        /**
         * Validation
         */
        const valididation = await validateAll(request.all(), {
            body: 'required'
        })
        if (valididation.fails()) {
            session.withErrors(valididation.messages()).flashAll()
            return response.redirect('back')
        }

        /**
         * Parent thread
         */
        const parentThread = await Thread.find(params.parent_id)
        parentThread.last_reply_at = moment()
        /**
         * Create a child thread
         */

        const thread = new Thread()

        thread.fill({
            body: request.all().body,
            user_id: auth.user.id,
            parent_id: params.parent_id
        })

        await thread.save()
        await parentThread.save()

        session.flash({ msg: 'Reply posted' })
        return response.route('back')
    }

    async getUnanseredThreads({ view, request }) {
        let threads = await Thread.query()
            .fetchAllThreads()
            .doesntHave('replies')
            .paginate(request.input('page', 1), Env.get('THREAD_SHOW_LIMIT'))

        return view.render('home', { threads })
    }
}

module.exports = ThreadController
