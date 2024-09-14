import knex from 'knex';

export const knexConfig = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'test',
    database: 'the_architect'
  },
  pool: {
    min: 1,
    max: 2
  }
})
