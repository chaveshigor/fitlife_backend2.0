'use strict'

const Route = use('Route')

//PERSONAL ACTIONS
Route.resource('personal', 'PersonalController').apiOnly()
Route.post('session/personal', 'SessionController.loginPersonal')
Route.resource('service', 'ServiceController').apiOnly()

//CLIENT ACTIONS
Route.resource('client', 'ClientController').apiOnly()
Route.post('session/client', 'SessionController.loginClient')


