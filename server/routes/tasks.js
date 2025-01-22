// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get(
      '/tasks',
      { name: 'tasks', preValidation: app.authenticate },
      async (req, reply) => {
        const options = req.query;
        const statuses = await app.objection.models.taskStatus.query();
        const users = await app.objection.models.user.query();
        const labels = await app.objection.models.label.query();

        const query = app.objection.models.task
          .query()
          .withGraphJoined('[status, creator, executor, labels]')
          .modify('sortByCreatedDate');

        const { status, executor, label, isCreatorUser } = options;
        if (status) {
          query.modify('findByStatus', status);
        }
        if (executor) {
          query.modify('findByExecutor', executor);
        }
        if (isCreatorUser) {
          query.modify('findByCreator', req.user.id);
        }
        if (label) {
          query.modify('findByLabel', label);
        }

        const tasks = await query;

        reply.render('tasks/index', {
          tasks,
          statuses,
          users,
          labels,
          options,
        });

        return reply;
      }
    )
    .get(
      '/tasks/new',
      { name: 'newTask', preValidation: app.authenticate },
      async (req, reply) => {
        const task = new app.objection.models.task();
        const users = await app.objection.models.user.query();
        const statuses = await app.objection.models.taskStatus.query();
        const labels = await app.objection.models.label.query();

        reply.render('tasks/new', { task, statuses, users, labels });

        return reply;
      }
    )

    .post('/tasks', { preValidation: app.authenticate }, async (req, reply) => {
      const task = new app.objection.models.task();
      const { data: formData } = req.body;

      const currentLabels = await app.objection.models.label
        .query()
        .findByIds(formData.labels ? formData.labels : []);

      const taskData = {
        ...formData,
        statusId: Number(req.body.data.statusId),
        executorId: Number(req.body.data.executorId),
        creatorId: req.user.id,
        labels: currentLabels,
      };

      try {
        await app.objection.models.task.transaction(async (trans) => {
          const insertedTask = await app.objection.models.task
            .query(trans)
            .insertGraph(taskData, { relate: ['labels'] });
          return insertedTask;
        });

        req.flash('info', i18next.t('flash.tasks.create.success'));
        reply.redirect(app.reverse('tasks'));
      } catch (err) {
        const users = await app.objection.models.user.query();
        const statuses = await app.objection.models.taskStatus.query();
        const labels = await app.objection.models.label.query();

        task.$set(formData);
        req.flash('error', i18next.t('flash.tasks.create.error'));
        reply.code(422);
        reply.render('tasks/new', {
          task,
          statuses,
          users,
          labels,
          errors: err.data,
        });
      }

      return reply;
    })
    .get(
      '/tasks/:id/edit',
      { name: 'editTask', preValidation: app.authenticate },
      async (req, reply) => {
        const { id } = req.params;

        const task = await app.objection.models.task
          .query()
          .findById(id)
          .withGraphJoined('labels');

        const users = await app.objection.models.user.query();
        const statuses = await app.objection.models.taskStatus.query();
        const labels = await app.objection.models.label.query();
        task.$set({ ...task, labels: task.labels.map((label) => label.id) });

        reply.render('tasks/edit', { task, statuses, users, labels });
        return reply;
      }
    )
    .patch(
      '/tasks/:id',
      { preValidation: app.authenticate },
      async (req, reply) => {
        const { id } = req.params;
        const { data: formData } = req.body;
        const labelsIds = [_.get(formData, 'labels', [])].flat();
        const existingLabels = await app.objection.models.label
          .query()
          .findByIds(labelsIds);
        const task = await app.objection.models.task.query().findById(id);
        const taskData = {
          ...task,
          ...formData,
          statusId: Number(formData.statusId),
          executorId: !formData.executorId ? null : Number(formData.executorId),
          labels: existingLabels,
        };

        try {
          await app.objection.models.task.transaction(async (trx) => {
            const updatedTask = await app.objection.models.task
              .query(trx)
              .allowGraph('labels')
              .upsertGraph(taskData, {
                relate: true,
                unrelate: true,
                noDelete: true,
              });
            return updatedTask;
          });

          req.flash('info', i18next.t('flash.task.edit.success'));
          reply.redirect(app.reverse('tasks'));
        } catch ({ data }) {
          const statuses = await app.objection.models.taskStatus.query();
          const users = await app.objection.models.user.query();
          const labels = await app.objection.models.label.query();
          task.$set({ ...formData, id });

          req.flash('error', i18next.t('flash.task.edit.error'));
          reply.code(422);
          reply.render('tasks/edit', {
            task,
            errors: data,
            statuses,
            users,
            labels,
          });
        }

        return reply;
      }
    )

    .delete(
      '/tasks/:id',
      { preValidation: app.authenticate },
      async (req, reply) => {
        const { id } = req.params;

        const task = await app.objection.models.task.query().findById(id);

        if (Number(task.creatorId) !== req.user.id) {
          req.flash('error', i18next.t('flash.tasks.noAccess'));
          reply.redirect(app.reverse('tasks'));
          return reply;
        }

        try {
          await task.$relatedQuery('labels').unrelate();
          await task.$query().delete();

          req.flash('info', i18next.t('flash.tasks.delete.success'));
        } catch ({ data }) {
          req.flash('error', i18next.t('flash.tasks.delete.error'));
        }

        reply.redirect(app.reverse('tasks'));
        return reply;
      }
    )
    .get(
      '/tasks/:id',
      { name: 'task', preValidation: app.authenticate },
      async (req, reply) => {
        const { id } = req.params;
        const task = await app.objection.models.task
          .query()
          .findById(id)
          .withGraphJoined('[status, creator, executor, labels]');

        reply.render('tasks/inner', { task });
        return reply;
      }
    );
};
