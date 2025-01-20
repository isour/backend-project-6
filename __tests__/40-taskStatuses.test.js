// @ts-check

import _ from 'lodash';
import fastify from 'fastify';

import init from '../server/plugin.js';
import { getTestData, prepareData, logIn } from './helpers/index.js';

describe('test statuses CRUD', () => {
  let app;
  let knex;
  let models;
  let cookies;
  const testData = getTestData();

  beforeAll(async () => {
    app = fastify({
      exposeHeadRoutes: false,
      logger: { target: 'pino-pretty' },
    });

    await init(app);
    knex = app.objection.knex;
    models = app.objection.models;

    // TODO: пока один раз перед тестами
    // тесты не должны зависеть друг от друга
    // перед каждым тестом выполняем миграции
    // и заполняем БД тестовыми данными
    await knex.migrate.latest();
    await prepareData(app);
    cookies = await logIn(app, testData.users.existing);
  });

  beforeEach(async () => {});

  it('index', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('statuses'),
      cookies,
    });

    expect(response.statusCode).toBe(200);
  });

  it('new', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newStatus'),
      cookies,
    });

    expect(response.statusCode).toBe(200);
  });

  it('create', async () => {
    const params = testData.statuses.new;

    const response = await app.inject({
      method: 'POST',
      url: app.reverse('statuses'),
      payload: {
        data: params,
      },
      cookies,
    });

    expect(response.statusCode).toBe(302);

    const status = await models.taskStatus
      .query()
      .findOne({ name: params.name });

    expect(status).toMatchObject(params);
  });

  it('edit', async () => {
    const current = await models.taskStatus
      .query()
      .findOne({ name: testData.statuses.existing.name });

    const response = await app.inject({
      method: 'GET',
      url: app.reverse('editStatus', { id: current.id }),
      cookies,
    });

    expect(response.statusCode).toBe(200);
  });

  it('update', async () => {
    const current = await models.taskStatus
      .query()
      .findOne({ name: testData.statuses.existing.name });

    const params = testData.statuses.update;

    const response = await app.inject({
      method: 'PATCH',
      url: app.reverse('status', { id: current.id }),
      cookies,
      payload: {
        data: params,
      },
    });

    expect(response.statusCode).toBe(302);

    const expected = testData.statuses.update;

    const status = await models.taskStatus
      .query()
      .findOne({ name: params.name });
    expect(status).toMatchObject(expected);
  });

  it('delete', async () => {
    const current = await models.taskStatus
      .query()
      .findOne({ name: testData.statuses.delete.name });

    const response = await app.inject({
      method: 'DELETE',
      url: app.reverse('status', { id: current.id }),
      cookies,
    });

    expect(response.statusCode).toBe(302);

    const user = await models.taskStatus.query().findById(current.id);
    expect(user).toBeUndefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
