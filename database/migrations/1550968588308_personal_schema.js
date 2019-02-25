'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PersonalSchema extends Schema {
  up () {
    this.create('personals', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('genre').notNullable()
      table.datetime('born').notNullable()
      table.string('profilePicture')
      table.string('description', 250)
      table.decimal('latitude', 9, 6).notNullable()
      table.decimal('longitude', 9, 6).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('personals')
  }
}

module.exports = PersonalSchema
