'use strict'

const Route = use('Route')

//PERSONAL ACTIONS
Route.resource('personal', 'PersonalController').apiOnly()
Route.post('session/personal', 'SessionController.loginPersonal')
Route.resource('service', 'ServiceController').apiOnly().except(['store'])
Route.post('newservice', 'ServiceController.newService')
Route.get('personaldash', 'PersonalController.me')

//CLIENT ACTIONS
Route.resource('client', 'ClientController').apiOnly()
Route.post('session/client', 'SessionController.loginClient')
Route.get('hireservice/:id', 'ServiceController.hireService')
Route.get('clientdash', 'ClientController.me')

//BOUTH ACTIONS
Route.post('session/clientpicture', 'ProfilePictureController.saveClientPicture')
Route.post('session/personalpicture', 'ProfilePictureController.savePersonalPicture')
Route.get('session/clientpicture/:id', 'ProfilePictureController.getClientPicture')
Route.get('session/personalpicture/:id', 'ProfilePictureController.getPersonalPicture')


