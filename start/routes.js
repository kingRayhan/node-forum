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

Route.get('/', 'homepageController.homePage').as('homePage')

/**
 * Authentication
 */
Route.get('/auth/login', 'AuthController.loginPage')
    .as('auth.login')
    .middleware(['Guest'])
Route.get('/auth/register', 'AuthController.registerPage')
    .as('auth.register')
    .middleware(['Guest'])

Route.post('/auth/login', 'AuthController.login').as('auth.login')
Route.post('/auth/register', 'AuthController.register').as('auth.register')
Route.post('/auth/logout', 'AuthController.logout').as('auth.logout')

/**
 * Thread
 */
Route.resource('threads', 'ThreadController').middleware(
    new Map([
        [['store', 'update', 'destroy', 'create', 'edit'], ['Authenticated']]
    ])
)
