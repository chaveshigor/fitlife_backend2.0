'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Service extends Model {

    from_personal () {
        return this.belongsTo('App/Models/Personal')
    }

    clients () {
        return this.belongsToMany(
        'App/Models/Client',
        'service_id',
        'client_id'
        ).pivotTable('client_services')
    }

}

module.exports = Service
