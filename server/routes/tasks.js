// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/tasks', { name: 'tasks' }, async (req, reply) => {
      const tasks = await app.objection.models.task.query();
      reply.render('tasks/index', { tasks });
      return reply;
    })
    .get('/tasks/new', { name: 'newTask' }, async (req, reply) => {
      const task = new app.objection.models.task();
      const users = await app.objection.models.user.query();
      const statuses = await app.objection.models.taskStatus.query();

      reply.render('tasks/new', { task, statuses, users });

      return reply;
    })
    .post('/tasks', async (req, reply) => {
      const task = new app.objection.models.task();

      const taskData = {
        ...req.body.data,
        statusId: Number(req.body.data.statusId),
        executorId: Number(req.body.data.executorId),
        creatorId: req.user.id,
      };

      try {
        await app.objection.models.task.query().insert(taskData);
        req.flash('info', i18next.t('flash.tasks.create.success'));
        reply.redirect(app.reverse('tasks'));
      } catch (err) {
        const users = await app.objection.models.user.query();
        const statuses = await app.objection.models.taskStatus.query();

        task.$set(taskData);
        req.flash('error', i18next.t('flash.tasks.create.error'));
        reply.code(422);
        reply.render('tasks/new', { task, statuses, users, errors: err.data });
      }

      return reply;
    })
    .get('/tasks/:id/edit', { name: 'editTask' }, async (req, reply) => {
      const { id } = req.params;

      const task = await app.objection.models.task.query().findById(id);

      const users = await app.objection.models.user.query();
      const statuses = await app.objection.models.taskStatus.query();

      reply.render('tasks/edit', { task, statuses, users });
      return reply;
    })
    .patch(
      '/tasks/:id',
      { name: 'task', preValidation: app.authenticate },
      async (req, reply) => {
        const { id } = req.params;

        const task = await app.objection.models.task.query().findById(id);

        const taskData = {
          ...req.body.data,
          statusId: Number(req.body.data.statusId),
          executorId: Number(req.body.data.executorId),
          creatorId: req.user.id,
        };

        try {
          await task.$query().patch(taskData);

          req.flash('info', i18next.t('flash.tasks.edit.success'));
          reply.redirect(app.reverse('tasks'));
        } catch ({ data }) {
          req.flash('error', i18next.t('flash.tasks.edit.error'));
          reply.code(422);
          task.$set(req.body.user);

          const users = await app.objection.models.user.query();
          const statuses = await app.objection.models.taskStatus.query();
          reply.render('tasks/edit', { task, statuses, users, errors: data });
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
          await app.objection.models.task.query().deleteById(id);
          req.flash('info', i18next.t('flash.tasks.delete.success'));
        } catch ({ data }) {
          req.flash('error', i18next.t('flash.tasks.delete.error'));
        }

        reply.redirect(app.reverse('tasks'));
        return reply;
      }
    );
};
