'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @typedef {import('@adonisjs/session/src/Session')} Session*/
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} Auth*/
/** @typedef {import('@adonisjs/validator/src/Validator')} validator*/

/** @type  {import('@adonisjs/validator/src/Validator')}*/
const { validateAll } = use('Validator')
const User = use('App/Models/User')

class AuthController {
    loginPage({ view }) {
        return view.render('auth/login')
    }

    registerPage({ view }) {
        return view.render('auth/register')
    }

    /**
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {Session} ctx.session
     * @param {Auth} ctx.auth
     */
    async login({ request, response, session, auth }) {
        /**
         * Validation
         */

        const valididation = await validateAll(
            request.all(),
            {
                email: 'required|email',
                password: 'required'
            },
            {
                required: '{{field}} is required',
                email: `Not a valid email address`
            }
        )
        if (valididation.fails()) {
            session.withErrors(valididation.messages()).flashAll()
            return response.route('auth.login')
        }
        const { email, password } = request.all()
        try {
            await auth.attempt(email, password)
        } catch (error) {
            return response.route('auth.login')
        }
        session.flash({ msg: 'You have been logged in successfully!!' })

        if (session.get('redirect_to')) {
            return response.route(session.get('redirect_to'))
        }

        return response.route('homePage')
    }

    /**
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {Session} ctx.session
     * @param {Auth} ctx.auth
     */
    async register({ request, response, session }) {
        /**
         * Validation
         */
        const valididation = await validateAll(request.all(), {
            email: 'required|email|unique:users,email',
            username: 'required|unique:users,username',
            password: 'required'
        })
        if (valididation.fails()) {
            session.withErrors(valididation.messages()).flashAll()
            return response.redirect('back')
        }

        let { email, username, password } = request.all()
        let user = new User()
        user.fill({ email, username, password })
        await user.save()
        session.flash({ msg: 'You have been registered successfully!!' })
        return response.route('homePage')
    }

    /**
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {Session} ctx.session
     * @param {Auth} ctx.auth
     */
    logout({ request, response, auth }) {
        auth.logout()
        return response.route('auth.login')
    }
}

module.exports = AuthController
