// @ts-check

import { URL } from 'url';
import fs from 'fs';
import path from 'path';

// TODO: использовать для фикстур https://github.com/viglucci/simple-knex-fixtures

const getFixturePath = (filename) =>
  path.join('..', '..', '__fixtures__', filename);
const readFixture = (filename) =>
  fs
    .readFileSync(new URL(getFixturePath(filename), import.meta.url), 'utf-8')
    .trim();
const getFixtureData = (filename) => JSON.parse(readFixture(filename));

export const getTestData = () => getFixtureData('testData.json');

export const prepareData = async (app) => {
  const { knex } = app.objection;

  // получаем данные из фикстур и заполняем БД
  await knex('users').insert(getFixtureData('users.json'));
  await knex('task_statuses').insert(getFixtureData('taskStatuses.json'));
  await knex('tasks').insert(getFixtureData('tasks.json'));
};

export const logIn = async (app, params) => {
  const res = await app.inject({
    method: 'POST',
    url: app.reverse('session'),
    payload: {
      data: params,
    },
  });

  return res.cookies.reduce((acc, cookie) => {
    if (cookie.name === 'session') {
      return {
        ...acc,
        [cookie.name]: cookie.value,
      };
    }

    return acc;
  }, {});
};
