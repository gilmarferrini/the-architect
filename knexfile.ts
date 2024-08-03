export default {
  development: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'test',
      database: 'thearchitect'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },
}
