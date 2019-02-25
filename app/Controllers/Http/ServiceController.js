'use strict'

const Service = use('App/Models/Service')

class ServiceController {

  async index ({ request, response, view }) {
    const service = await Service.query().with('from_personal').fetch()
    return service
  }

  async newService ({ request, auth }) {
    const data = request.all()
    const personal = await auth.authenticator('personal').getUser()//Pega informações do usuário
    const service = await Service.create({ personal_id: personal.id, ...data })
    return service
  }

  async hireService ({ auth, params }) {
    const service = await Service.findOrFail(params.id)
    const client = await auth.authenticator('client').getUser()
    //const hiredService = await HiredService.create({service})
    //return hiredService
  }

  async show ({ params }) {
    const service = await Service.findOrFail(params.id)
    return service
  }

  async update ({ params, request }) {
    const data = request.only(['title','price','description'])
    const service = await Service.find(params.id)
    service.merge(data)
    await service.save()
    return service
  }

  async destroy ({ params, request, response }) {
    const service = await Service.find(params.id)
    await service.delete()
  }
}

module.exports = ServiceController
