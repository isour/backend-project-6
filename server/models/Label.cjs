// @ts-check

const BaseModel = require('./BaseModel.cjs');
const objectionUnique = require('objection-unique');

const unique = objectionUnique({ fields: ['name'] });

module.exports = class Label extends unique(BaseModel) {
  static get tableName() {
    return 'labels';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1 },
      },
    };
  }

  static relationMappings = {
    tasks: {
      relation: BaseModel.ManyToManyRelation,
      modelClass: 'Task.cjs',
      join: {
        from: 'labels.id',
        through: {
          from: 'tasks_labels.label_id',
          to: 'tasks_labels.task_id',
        },
        to: 'tasks.id',
      },
    },
  };
};
