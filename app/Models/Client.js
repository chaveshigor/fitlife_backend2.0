'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Hash = use('Hash')

class Client extends Model {
    static boot () {
        super.boot()
    
        this.addHook('beforeSave', async (userInstance) => {
          if (userInstance.dirty.password) {
            userInstance.password = await Hash.make(userInstance.password)
          }
        })
      }
      
      tokens () {
        return this.hasMany('App/Models/Token')
      }

      services () {
        return this.hasMany('App/Models/Service')
      }

      myPersonals () {
        return this.belongsToMany('App/Models/Personal')
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

module.exports = Client
