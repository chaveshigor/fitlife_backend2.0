'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientPersonalSchema extends Schema {
  up () {
    this.create('client_personals', (table) => {
      table.increments()
      table.integer('client_id').unsigned().notNullable()
      table.integer('personal_id').unsigned().notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('client_personals')
  }
}

module.exports = ClientPersonalSchema
