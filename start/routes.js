'use strict'

const Route = use('Route')

//PERSONAL ACTIONS
Route.resource('personal', 'PersonalController').apiOnly()
Route.post('session/personal', 'SessionController.loginPersonal')
Route.resource('service', 'ServiceController').apiOnly().except(['store'])
Route.post('newservice', 'ServiceController.newService')

//CLIENT ACTIONS
Route.resource('client', 'ClientController').apiOnly()
Route.post('session/client', 'SessionController.loginClient')
Route.get('hireservice/:id', 'ServiceController.hireService')


