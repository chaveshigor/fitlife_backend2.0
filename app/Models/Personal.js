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
      
      tokens () {
        return this.hasMany('App/Models/Token')
      }

      myClients () {
        return this.belongsToMany('App/Models/Client')
      }

      myServices () {
        return this.hasMany('App/Models/Service')
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
