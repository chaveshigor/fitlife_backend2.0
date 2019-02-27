'use strict'

const Helpers = use('Helpers')
const Env = use('Env')
const fs = use('fs')
const readFile = Helpers.promisify(fs.readFile)

const Personal = use('App/Models/Personal')
const Client = use('App/Models/Client')

class ProfilePictureController {

    async saveClientPicture ({ request, auth }) {
        const profilePic = request.file('profile_pic', {
            types: ['image'],
            size: '2mb'
        })
        const { clientName: picture_name } = profilePic
       
        if(Env.get('STORAGE') === 'local') {
            await profilePic.move(Helpers.tmpPath('uploads'), {
                name:`${new Date().getTime()}-${picture_name}`
            })//PICTURE RECIVED FROM FRONTEND
            const { fileName: file_name } = profilePic//PIC NAME
            const url = {profilePicture: `uploads/${file_name}`}//URL

            if(!profilePic.moved()) {
                return profilePic.error()
            }

            const client_data = await auth.authenticator('client').getUser()//CLIENT ID
            const client = await Client.find(client_data.id)//CLIENT
            client.merge(url)
            await client.save()
            return 'Picture Recived'

        } else {
            //MANDAR FOTO PARA S3
        }
    }

    async getClientPicture ({ params, response }) {
        const client = await Client.find(params.id)//SEARCH THE PROFILE PICTURE WITH THE CLIENT ID
        response.header('Content-type', 'image')//SAY TO NAVIGATOR TO RENDER THE IMAGE, TO NOT DOWNLOAD IT
        return await readFile(Helpers.tmpPath(`${client.profilePicture}`))//SHOW IMAGE 
    }

    async savePersonalPicture ({ request, auth }) {
        const profilePic = request.file('profile_pic', {
            types: ['image'],
            size: '2mb'
        })
        const { clientName: picture_name } = profilePic
       
        if(Env.get('STORAGE') === 'local') {
            await profilePic.move(Helpers.tmpPath('uploads'), {
                name:`${new Date().getTime()}-${picture_name}`
            })//PICTURE RECIVED FROM FRONTEND
            const { fileName: file_name } = profilePic//PIC NAME
            const url = {profilePicture: `uploads/${file_name}`}//URL

            if(!profilePic.moved()) {
                return profilePic.error()
            }

            const personal_data = await auth.authenticator('personal').getUser()//CLIENT ID
            const personal = await Personal.find(personal_data.id)//CLIENT
            personal.merge(url)
            await personal.save()
            return 'Picture Recived'

        } else {
            //MANDAR FOTO PARA S3
        }
    }

    async getPersonalPicture ({ params, response }) {
        const personal = await Personal.find(params.id)//SEARCH THE PROFILE PICTURE WITH THE CLIENT ID
        response.header('Content-type', 'image')//SAY TO NAVIGATOR TO RENDER THE IMAGE, TO NOT DOWNLOAD IT
        return await readFile(Helpers.tmpPath(`${personal.profilePicture}`))//SHOW IMAGE 
    }

}

module.exports = ProfilePictureController
