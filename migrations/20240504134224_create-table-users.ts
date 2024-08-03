import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', table => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid()).index()
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.string('password').notNullable()
    table.string('email').notNullable().unique().index()
    table.boolean('archived').notNullable().defaultTo(false)
    table.enum('user_type', ['admin', 'user']).defaultTo('admin')
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.uuid('account_id').unsigned().index()
    table.foreign('account_id').references('accounts.id')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
}
