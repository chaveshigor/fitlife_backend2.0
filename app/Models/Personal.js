'use strict'

const Model = use('Model')
const Hash = use('Hash')
const Database = use('Database')

class Personal extends Model {
    static boot () {
        super.boot()
    
        this.addHook('beforeSave', async (userInstance) => {
          if (userInstance.dirty.password) {
            userInstance.password = await Hash.make(userInstance.password)
          }
        })
      }

      static get hidden () {
        return ['password']
      }
      
      tokens () {
        return this.hasMany('App/Models/Token')
      }

      my_services () {
        return this.hasMany('App/Models/Service')
      }

      my_clients () {
        return this.hasMany('App/Models/Client')
      }

      static scopeNearBy (query, latitude, longitude, distance) {
        const haversine = `(6371 * acos(cos(radians(${latitude}))
        * cos(radians(latitude))
        * cos(radians(longitude)
        - radians(${longitude}))
        + sin(radians(${latitude}))
        * sin(radians(latitude))))`
    
        return query
        .select('*', Database.raw(`${haversine} as distance`))
        .whereRaw(`${haversine} < ${distance}`)
      }
}

module.exports = Personal
