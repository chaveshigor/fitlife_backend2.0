'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientServiceSchema extends Schema {
  up () {
    this.create('client_services', (table) => {
      table.increments()
      table.integer('client_id').unsigned().notNullable()
      table.integer('service_id').unsigned().notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('client_services')
  }
}

module.exports = ClientServiceSchema
