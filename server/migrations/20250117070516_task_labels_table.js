export const up = (knex) =>
  knex.schema.createTable('tasks_labels', (table) => {
    table.increments('id').primary();
    table.integer('task_id').references('tasks.id');
    table.integer('label_id').references('labels.id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

export const down = (knex) => knex.schema.dropTableIfExists('tasks_labels');
