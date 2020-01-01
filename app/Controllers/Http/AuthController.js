'use strict'

const { validateAll } = use('Validator')
const User = use('App/Models/User')

class AuthController {
    loginPage({ view }) {
        return view.render('auth/login')
    }

    registerPage({ view }) {
        return view.render('auth/register')
    }

    async login({ request, response, session, auth }) {
        /**
         * Validation
         */
        const valididation = await validateAll(request.all(), {
            email: 'required|email',
            password: 'required'
        })
        if (valididation.fails()) {
            session.withErrors(valididation.messages()).flashAll()
            return response.redirect('back')
        }
        const { email, password } = request.all()
        await auth.attempt(email, password)
        session.flash({ msg: 'You have been logged in successfully!!' })
        return response.route('homePage')
    }

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

    logout({ request, response, auth }) {
        auth.logout()
        return response.route('auth.login')
    }
}

module.exports = AuthController
