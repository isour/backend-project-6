// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/statuses', { name: 'statuses' }, async (req, reply) => {
      const statuses = await app.objection.models.taskStatus.query();
      reply.render('statuses/index', { statuses });
      return reply;
    })
    .get(
      '/statuses/new',
      { name: 'newStatus', preValidation: app.authenticate },
      (req, reply) => {
        const taskStatus = new app.objection.models.taskStatus();
        reply.render('statuses/new', { taskStatus });
      },
    )
    .post(
      '/statuses',
      { preValidation: app.authenticate },
      async (req, reply) => {
        const status = new app.objection.models.taskStatus();
        status.$set(req.body.data);

        try {
          const validStatus = await app.objection.models.taskStatus.fromJson(
            req.body.data,
          );
          await app.objection.models.taskStatus.query().insert(validStatus);
          req.flash('info', i18next.t('flash.statuses.create.success'));
          reply.redirect(app.reverse('statuses'));
        } catch (err) {
          req.flash('error', i18next.t('flash.statuses.create.error'));
          reply.code(422);
          reply.render('statuses/new', {
            taskStatus: status,
            errors: err.data,
          });
        }

        return reply;
      },
    )
    .get(
      '/statuses/:id/edit',
      { preValidation: app.authenticate, name: 'editStatus' },
      async (req, reply) => {
        const { id } = req.params;

        const status = await app.objection.models.taskStatus
          .query()
          .findById(id);
        reply.render('statuses/edit', { taskStatus: status });
        return reply;
      },
    )
    .patch(
      '/statuses/:id',
      { name: 'status', preValidation: app.authenticate },
      async (req, reply) => {
        const { id } = req.params;

        const status = await app.objection.models.taskStatus
          .query()
          .findById(id);

        try {
          await status.$query().patch(req.body.data);

          req.flash('info', i18next.t('flash.statuses.edit.success'));
          reply.redirect(app.reverse('statuses'));
        } catch ({ data }) {
          req.flash('error', i18next.t('flash.statuses.edit.error'));
          reply.code(422);
          status.$set(req.body.data);
          reply.render('statuses/edit', { taskStatus: status, errors: data });
        }

        return reply;
      },
    )
    .delete(
      '/statuses/:id',
      { preValidation: app.authenticate },
      async (req, reply) => {
        const { id } = req.params;

        try {
          await app.objection.models.taskStatus.query().deleteById(id);
          req.flash('info', i18next.t('flash.statuses.delete.success'));
        } catch ({ data }) {
          req.flash('error', i18next.t('flash.statuses.delete.error'));
        }

        reply.redirect(app.reverse('statuses'));
        return reply;
      },
    );
};
