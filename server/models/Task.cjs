// @ts-check

const BaseModel = require('./BaseModel.cjs');
const objectionUnique = require('objection-unique');

const unique = objectionUnique({ fields: ['name'] });

module.exports = class Task extends unique(BaseModel) {
  static get tableName() {
    return 'tasks';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1 },
        statusId: { type: 'integer', minimum: 1 },
        creatorId: { type: 'integer', minimum: 1 },
      },
    };
  }

  static relationMappings = {
    tasks: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: 'TaskStatus.cjs',
      join: {
        from: 'tasks.status_id',
        to: 'task_statuses.id',
      },
    },
    creator: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: 'User.cjs',
      join: {
        from: 'tasks.creator_id',
        to: 'users.id',
      },
    },
    executor: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: 'User.cjs',
      join: {
        from: 'tasks.executor_id',
        to: 'users.id',
      },
    },
    labels: {
      relation: BaseModel.ManyToManyRelation,
      modelClass: 'Label.cjs',
      join: {
        from: 'tasks.id',
        through: {
          from: 'tasks_labels.task_id',
          to: 'tasks_labels.label_id',
        },
        to: 'labels.id',
      },
    },
  };
};
