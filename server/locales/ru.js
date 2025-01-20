// @ts-check

export default {
  translation: {
    appName: 'Менеджер задач',
    flash: {
      session: {
        create: {
          success: 'Вы залогинены',
          error: 'Неправильный емейл или пароль',
        },
        delete: {
          success: 'Вы разлогинены',
        },
      },
      users: {
        create: {
          error: 'Не удалось зарегистрировать',
          success: 'Пользователь успешно зарегистрирован',
        },
        edit: {
          error: 'Не удалось изменить пользователя',
          success: 'Пользователь успешно изменён',
        },
        delete: {
          error: 'Не удалось удалить пользователя',
          success: 'Пользователь успешно удалён',
        },
        accessError:
          'Вы не можете редактировать или удалять другого пользователя',
      },
      tasks: {
        create: {
          error: 'Не удалось создать задачу',
          success: 'Задача успешно создана',
        },
        edit: {
          error: 'Не удалось изменить задачу',
          success: 'Задача успешно изменена',
        },
        delete: {
          error: 'Задачу может удалить только её автор',
          success: 'Задача успешно удалена',
        },
      },
      statuses: {
        create: {
          error: 'Не удалось создать статус',
          success: 'Статус успешно создан',
        },
        edit: {
          error: 'Не удалось изменить статус',
          success: 'Статус успешно изменён',
        },
        delete: {
          error: 'Не удалось удалить статус',
          success: 'Статус успешно удалён',
        },
      },
      authError: 'Доступ запрещён! Пожалуйста, авторизируйтесь.',
      labels: {
        create: {
          error: 'Не удалось создать метку',
          success: 'Метка успешно создана',
        },
        edit: {
          error: 'Не удалось изменить метку',
          success: 'Метка успешно изменена',
        },
        delete: {
          error: 'Не удалось удалить метку',
          success: 'Метка успешно удалена',
        },
      },
    },
    layouts: {
      application: {
        title: 'Hexlet Task Manager',
        users: 'Пользователи',
        taskStatuses: 'Статусы',
        labels: 'Метки',
        tasks: 'Задачи',
        signIn: 'Вход',
        signUp: 'Регистрация',
        signOut: 'Выход',
      },
    },
    views: {
      session: {
        new: {
          signIn: 'Вход',
          submit: 'Войти',
        },
      },
      users: {
        id: 'ID',
        email: 'Email',
        createdAt: 'Дата создания',
        new: {
          submit: 'Сохранить',
          signUp: 'Регистрация',
        },
        change: 'Изменить',
        delete: 'Удалить',
        actions: 'Действия',
      },
      welcome: {
        index: {
          hello: 'Привет от Hexlet!',
          description: 'Онлайн-школа программирования',
          more: 'Узнать больше',
        },
      },
      user: {
        firstName: 'Имя',
        lastName: 'Фамилия',
        email: 'Электронная почта',
        password: 'Пароль',
        new: {
          submit: 'Сохранить',
        },
        edit: {
          title: 'Редактирование пользователя',
          submit: 'Изменить',
        },
      },
      statuses: {
        title: 'Статусы',
        create: 'Создать',
        id: 'Идентификатор',
        name: 'Название',
        createdAt: 'Дата создания',
        new: {
          title: 'Создание статуса',
          submit: 'Создать',
        },
        edit: {
          title: 'Обновление статуса',
          submit: 'Обновить',
        },
        change: 'Изменить',
        delete: 'Удалить',
        actions: 'Действия',
      },
      tasks: {
        title: 'Задачи',
        create: 'Создать',
        id: 'Идентификатор',
        name: 'Название',
        description: 'Описание',
        createdAt: 'Дата создания',
        new: {
          title: 'Создание задачи',
          submit: 'Создать',
        },
        edit: {
          title: 'Обновление задачи',
          submit: 'Обновить',
        },
        change: 'Изменить',
        delete: 'Удалить',
        actions: 'Действия',
      },
      task: {
        name: 'Название задачи',
        description: 'Описание',
        statusId: 'Статус',
        executorId: 'Исполнитель',
        filter: {
          status: 'Статус',
          executor: 'Исполнитель',
          label: 'Метка',
          isCreatorUser: 'Только мои задачи',
          submit: 'Показать',
        },
      },
      taskStatus: {
        name: 'Имя',
      },
      labels: {
        title: 'Метки',
        create: 'Создать',
        id: 'ID',
        name: 'Имя',
        createdAt: 'Дата создания',
        new: {
          title: 'Создать метку',
          submit: 'Создать',
        },
        edit: {
          title: 'Обновить метка',
          submit: 'Метка',
        },
        change: 'Изменить',
        delete: 'Удалить',
        actions: 'Действия',
      },
      label: {
        name: 'Имя метки',
      },
    },
  },
};
