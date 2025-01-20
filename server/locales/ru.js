// @ts-check

export default {
  translation: {
    appName: 'Диспетчер задач',
    flash: {
      session: {
        create: {
          success: 'Вы вошли в систему',
          error: 'Неверный адрес электронной почты или пароль',
        },
        delete: {
          success: 'Вы вышли из системы',
        },
      },
      users: {
        create: {
          error: 'Не удалось зарегистрироваться',
          success: 'Пользователь успешно зарегистрирован',
        },
        edit: {
          error: 'Не удалось изменить данные',
          success: 'Пользователь успешно сохранен',
        },
        delete: {
          error: 'Не удалось удалить',
          success: 'Вы удалили пользователя',
        },
        noAccess: 'У вас нет доступа',
      },
      tasks: {
        create: {
          error: 'Не удалось создать задачу',
          success: 'Задача создана успешно',
        },
        edit: {
          error: 'Не удалось изменить задачу',
          success: 'Задача успешно сохранена',
        },
        delete: {
          error: 'Не удалось удалить задачу',
          success: 'Вы удалили задачу',
        },
        noAccess: 'У вас нет доступа',
      },
      statuses: {
        create: {
          error: 'Не удалось создать статус',
          success: 'Статус создан успешно',
        },
        edit: {
          error: 'Не удалось изменить статус',
          success: 'Статус успешно сохранен',
        },
        delete: {
          success: 'Вы удалили статус',
        },
      },
      authError: 'Доступ запрещен! Пожалуйста, войдите в систему',
      labels: {
        create: {
          error: 'Не удалось создать метку',
          success: 'Метка создана успешно',
        },
        edit: {
          error: 'Не удалось изменить метку',
          success: 'Метка успешно сохранена',
        },
        delete: {
          error: 'Не удалось удалить метку',
          success: 'Вы удалили метку',
        },
        noAccess: 'У вас нет доступа',
      },
    },
    layouts: {
      application: {
        users: 'Пользователи',
        signIn: 'Вход',
        signUp: 'Регистрация',
        signOut: 'Выход',
        statuses: 'Статусы',
        tasks: 'Задачи',
        labels: 'Метки',
      },
    },
    views: {
      session: {
        new: {
          signIn: 'Войти',
          submit: 'Войти',
        },
      },
      users: {
        id: 'Идентификатор',
        email: 'Электронная почта',
        createdAt: 'Создано',
        new: {
          submit: 'Зарегистрироваться',
          signUp: 'Зарегистрироваться',
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
        createdAt: 'Создано',
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
        createdAt: 'Создано',
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
        createdAt: 'Создано',
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
