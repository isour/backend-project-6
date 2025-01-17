// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/labels', { name: 'labels' }, async (req, reply) => {
      const labels = await app.objection.models.label.query();
      reply.render('labels/index', { labels });

      return reply;
    })
    .get('/labels/new', { name: 'newLabel' }, async (req, reply) => {
      const label = new app.objection.models.label();

      reply.render('labels/new', { label });

      return reply;
    })
    .post('/labels', async (req, reply) => {
      const label = new app.objection.models.label();
      label.$set(req.body.data);

      try {
        const validLabel = await app.objection.models.label.fromJson(
          req.body.data
        );
        await app.objection.models.label.query().insert(validLabel);
        req.flash('info', i18next.t('flash.labels.create.success'));
        reply.redirect(app.reverse('labels'));
      } catch (err) {
        req.flash('error', i18next.t('flash.labels.create.error'));
        reply.code(422);
        reply.render('labels/new', {
          label: label,
          errors: err.data,
        });
      }

      return reply;
    })
    .get('/labels/:id/edit', { name: 'editLabel' }, async (req, reply) => {
      const { id } = req.params;
      const label = await app.objection.models.label.query().findById(id);

      reply.render('labels/edit', { label });

      return reply;
    })
    .patch(
      '/labels/:id',
      { name: 'label', preValidation: app.authenticate },
      async (req, reply) => {
        const { id } = req.params;

        const label = await app.objection.models.label.query().findById(id);

        try {
          await label.$query().patch(req.body.data);

          req.flash('info', i18next.t('flash.labels.edit.success'));
          reply.redirect(app.reverse('labels'));
        } catch ({ data }) {
          req.flash('error', i18next.t('flash.labels.edit.error'));
          reply.code(422);
          label.$set(req.body.data);
          reply.render('labels/edit', { label, errors: data });
        }

        return reply;
      }
    )
    .delete(
      '/labels/:id',
      { preValidation: app.authenticate },
      async (req, reply) => {
        const { id } = req.params;
        const label = await app.objection.models.label.query().findById(id);
        const tasks = await label.$relatedQuery('tasks');

        if (tasks.length === 0) {
          await app.objection.models.label.query().deleteById(id);
          req.flash('info', i18next.t('flash.labels.delete.success'));
        } else {
          req.flash('error', i18next.t('flash.labels.delete.error'));
        }

        reply.redirect(app.reverse('labels'));

        return reply;
      }
    );
};
