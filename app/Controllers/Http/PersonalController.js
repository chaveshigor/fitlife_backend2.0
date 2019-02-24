'use strict'

const Personal = use('App/Models/Personal')

class PersonalController {

  async index ({ request }) {
    const { latitude, longitude, distance } = request.all()
    const personal = await Personal.query().nearBy(latitude, longitude, distance).with('myServices').fetch()
    return personal

  }

  async store ({ request }) {
    const data = request.only(['latitude','longitude','name','email','password','genre','born','profilePicture','description'])
    const personal = await Personal.create(data)
    return personal
  }

  async show ({ params }) {
    const personal = await Personal.find(params.id)
    return personal
  }

  async update ({ params, request }) {
    const data = request.only(['description', 'profilePicture'])
    const personal = await Personal.find(params.id)
    personal.merge(data)
    await personal.save()
    return personal
  }

  async destroy ({ params, request, response }) {
    const personal = await Personal.find(params.id)
    await personal.delete()
  }
}

module.exports = PersonalController
