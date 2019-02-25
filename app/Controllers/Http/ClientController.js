'use strict'

const Client = use('App/Models/Client')

class ClientController {

  async me ({ auth }) {
    const me = await auth.authenticator('client').getUser()
    const client = await Client.query().where('id', me.id).with('hired_services').with('my_personals').fetch()
    return client
  }

  async index ({ request, response, view }) {
    const { latitude, longitude, distance } = request.all()
    const client = await Client.query().nearBy(latitude, longitude, distance).fetch()
    return client
  }

  async store ({ request, response }) {
    const data = request.only(['latitude','longitude','name','email','password','genre','born','profilePicture','description'])
    const client = await Client.create(data)
    return client
  }

  async show ({ params, request, response, view }) {
    const client = await Client.find(params.id)
    return client
  }

  async update ({ params, request, response, view }) {
    const data = request.onli(['description', 'profilePicture'])
    const client = await Client.find(params.id)
    client.merge(data)
    await client.save()
    return client
  }

  async destroy ({ params, request, response }) {
    const client = await Client.find(params.id)
    await client.delete()
  }
}

module.exports = ClientController
