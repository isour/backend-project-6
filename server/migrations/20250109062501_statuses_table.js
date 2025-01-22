export const up = (knex) => knex.schema.createTable('task_statuses', (table) => {
  table.increments('id').primary();
  table.string('name').unique();
  table.timestamp('created_at').defaultTo(knex.fn.now());
  table.timestamp('updated_at').defaultTo(knex.fn.now());
});

export const down = (knex) => knex.schema.dropTableIfExists('task_statuses');
