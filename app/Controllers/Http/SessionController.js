'use strict'

const Personal = use('App/Models/Personal')
const Client = use('App/Models/Client')

class SessionController {
    async loginPersonal ({ request, auth }) {

        const { email, password } = request.all()
        const location = request.only(['latitude', 'longitude'])
        const token = await auth.authenticator('personal').attempt(email, password)
        const personal = await Personal.findBy('email', email)
        personal.merge(location)
        await personal.save()
        return token

    }

    async loginClient ({ request, auth }) {

        const { email, password } = request.all()
        const location = request.only(['latitude', 'longitude'])
        const token = await auth.authenticator('client').attempt(email, password)
        const client = await Client.findBy('email', email)
        client.merge(location)
        await client.save()
        return token

    }

}

module.exports = SessionController
