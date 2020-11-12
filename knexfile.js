// Update with your config settings.

module.exports = {
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.PORT || 3306,
    database: process.env.DB_NAME || 'dsrpt21',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
