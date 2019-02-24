'use strict'

const Service = use('App/Models/Service')
const Personal = use('App/Models/Personal')

class ServiceController {

  async index ({ request, response, view }) {
    const service = await Service.all()
    return service
  }

  async store ({ request, auth, response, view }) {
    const data = request.all()
    const user = await auth.authenticator('personal').getUser()//Pega informações do usuário
    const service = await Service.create({ personal_id: user.id, ...data })
    return service
  }

  async show ({ params, request, response, view }) {
    const service = await Service.find(params.id)
    return service
  }

  async update ({ params, request, response }) {
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
