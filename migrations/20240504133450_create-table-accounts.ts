import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('accounts', table => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid())
    table.string('name').notNullable()
    table.string('description').nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('accounts')
}

