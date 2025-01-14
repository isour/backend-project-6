// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/users', { name: 'users' }, async (req, reply) => {
      const users = await app.objection.models.user.query();
      reply.render('users/index', { users });
      return reply;
    })
    .get('/users/new', { name: 'newUser' }, (req, reply) => {
      const user = new app.objection.models.user();
      reply.render('users/new', { user });
    })
    .post('/users', async (req, reply) => {
      const user = new app.objection.models.user();
      user.$set(req.body.data);

      try {
        const validUser = await app.objection.models.user.fromJson(
          req.body.data
        );
        await app.objection.models.user.query().insert(validUser);
        req.flash('info', i18next.t('flash.users.create.success'));
        reply.redirect(app.reverse('root'));
      } catch (err) {
        req.flash('error', i18next.t('flash.users.create.error'));
        reply.render('users/new', { user, errors: err.data });
      }

      return reply;
    })
    .get('/users/:id/edit', { name: 'editUser' }, async (req, reply) => {
      const { id } = req.params;

      if (Number(id) !== req.user.id) {
        req.flash('error', i18next.t('flash.users.noAccess'));
        reply.redirect(app.reverse('users'));
        return reply;
      }

      const user = await app.objection.models.user.query().findById(id);
      reply.render('users/edit', { user });
      return reply;
    })
    .patch(
      '/users/:id',
      { name: 'user', preValidation: app.authenticate },
      async (req, reply) => {
        const { id } = req.params;
        const { firstName, lastName, email, password } = req.body.data;

        if (Number(id) !== req.user.id) {
          req.flash('error', i18next.t('flash.users.noAccess'));
          reply.redirect(app.reverse('users'));
          return reply;
        }

        const user = await app.objection.models.user.query().findById(id);

        try {
          await user.$query().patch({
            firstName,
            lastName,
            email,
            password,
          });

          req.flash('info', i18next.t('flash.users.edit.success'));
          reply.redirect(app.reverse('users'));
        } catch ({ data }) {
          req.flash('error', i18next.t('flash.users.edit.error'));
          reply.code(422);
          user.$set(req.body.user);
          reply.render('users/edit', { user, errors: data });
        }

        return reply;
      }
    )
    .delete(
      '/users/:id',
      { preValidation: app.authenticate },
      async (req, reply) => {
        const { id } = req.params;

        if (Number(id) !== req.user.id) {
          req.flash('error', i18next.t('flash.users.noAccess'));
          reply.redirect(app.reverse('users'));
          return reply;
        }

        try {
          await app.objection.models.user.query().deleteById(req.user.id);
          req.logOut();
          req.flash('info', i18next.t('flash.users.delete.success'));
        } catch ({ data }) {
          req.flash('error', i18next.t('flash.users.delete.error'));
        }

        reply.redirect(app.reverse('users'));
        return reply;
      }
    );
};
