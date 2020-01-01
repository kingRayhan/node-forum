'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/')
    .render('home')
    .as('homePage')
// .middleware(['auth'])

/**
 * Authentication
 */
Route.get('/auth/login', 'AuthController.loginPage').as('auth.login')
Route.get('/auth/register', 'AuthController.registerPage').as('auth.register')

Route.post('/auth/login', 'AuthController.login').as('auth.login')
Route.post('/auth/register', 'AuthController.register').as('auth.register')
Route.post('/auth/logout', 'AuthController.logout').as('auth.logout')
