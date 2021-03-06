const knex = require('knex')
const configMariaDB = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'consigna'
  },
  pool: { min: 0, max: 7 }
}
const configSQLite3 = {
    client: 'sqlite3',
    connection: {
      filename: './database/mydb.sqlite'
    },
    useNullAsDefault: true
}

const database = knex(configMariaDB)

module.exports = database
