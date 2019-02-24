'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Service extends Model {

    serviceFromPersonal () {
        return this.belongsTo('App/Models/Personal')
    }

    serviceToClient () {
        return this.belongsToMany('App/Models/Client')
    }
}

module.exports = Service
