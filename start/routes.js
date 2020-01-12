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
Route.get('/threads/unanswered', 'ThreadController.getUnanseredThreads').as(
    'threads.unanswered'
)
Route.resource('threads', 'ThreadController').middleware(
    new Map([
        [['store', 'update', 'destroy', 'create', 'edit'], ['Authenticated']]
    ])
)

Route.get('/@:username', 'ProfileController.index').as('profile.index')

Route.get('/tags/:tag_slug', 'TagController.ThreadsOfTag').as('tag.threads')

Route.post(
    'threads/:parent_id/store_child_thread',
    'ThreadController.storeChildThread'
)
    .middleware(['Authenticated'])
    .as('threads.storeChildThread')
