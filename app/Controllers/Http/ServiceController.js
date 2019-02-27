'use strict'

const Service = use('App/Models/Service')
const Personal = use('App/Models/Personal')
const Client = use('App/Models/Client')

class ServiceController {

  /*async index ({ request, response, view }) {
    const service = await Service.query().with('from_personal').fetch()
    return service
  }*/
  async index ({ }) {
    const hiredService = await Service.query().with('clients').fetch()
    return hiredService
  }

  async newService ({ request, auth }) {
    const data = request.all()
    const personal = await auth.authenticator('personal').getUser()//Pega informações do usuário
    const service = await Service.create({ personal_id: personal.id, ...data })
    return service
  }

  async hireService ({ auth, params }) {
    const service = await Service.findOrFail(params.id)
    const personal_id = service.personal_id
    const personal = await Personal.find(personal_id)
    const client = await auth.authenticator('client').getUser()
    await client.hired_services().attach(service.id)
    await client.my_personals().attach(personal_id)
    await service.save()
    await personal.save()
    await client.save()
    return service
  }

  async leaveService ({ auth, params }) {
    const service = await Service.findOrFail(params.id)
    const personal_id = service.personal_id
    const personal = await Personal.find(personal_id)
    const client = await auth.authenticator('client').getUser()
    await client.hired_services().detach(service.id)
    await client.my_personals().detach(personal_id)
    await service.save()
    await personal.save()
    await client.save()
    return service
  }

  async deleteService ({ auth, params }) {
    const service = await Service.findOrFail(params.id)
    const client = await auth.authenticator('client').getUser()
    await client.hired_services().detach(service.id)
    await service.delete()
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
