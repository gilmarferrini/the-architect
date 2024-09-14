import knex from "knex";
import path from "path";

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
