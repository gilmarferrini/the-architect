import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', table => {
    table.uuid('id', { primaryKey: true }).defaultTo(knex.fn.uuid())
    table.integer('account_id').unsigned()
    table.foreign('account_id')
        .references('accounts.id')
        .deferrable('deferred')
        .onDelete('RESTRICT')
    table.string('name', 50)
    table.string('email', 100).unique()
    table.string('password', 20)
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
}
