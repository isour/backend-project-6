// @ts-check

export default {
  translation: {
    appName: 'Task Manager',
    flash: {
      session: {
        create: {
          success: 'You are logged in',
          error: 'Wrong email or password',
        },
        delete: {
          success: 'You are logged out',
        },
      },
      users: {
        create: {
          error: 'Failed to register',
          success: 'User registered successfully',
        },
        edit: {
          error: 'Failed to edit',
          success: 'User saved successfully',
        },
        delete: {
          error: 'Failed to delete',
          success: 'You deleted user',
        },
        noAccess: 'You dont have access',
      },
      tasks: {
        create: {
          error: 'Failed to create task',
          success: 'Task created successfully',
        },
        edit: {
          error: 'Failed to edit',
          success: 'Task saved successfully',
        },
        delete: {
          error: 'Failed to delete',
          success: 'You deleted task',
        },
        noAccess: 'You dont have access',
      },
      statuses: {
        create: {
          error: 'Failed to create',
          success: 'Status created successfully',
        },
        edit: {
          error: 'Failed to edit',
          success: 'Status saved successfully',
        },
        delete: {
          success: 'You deleted status',
        },
      },
      authError: 'Access denied! Please login',
      labels: {
        create: {
          error: 'Failed to create label',
          success: 'Label created successfully',
        },
        edit: {
          error: 'Failed to edit',
          success: 'Label saved successfully',
        },
        delete: {
          error: 'Failed to delete',
          success: 'You deleted label',
        },
        noAccess: 'You dont have access',
      },
    },
    layouts: {
      application: {
        users: 'Users',
        signIn: 'Login',
        signUp: 'Register',
        signOut: 'Logout',
        statuses: 'Statuses',
        tasks: 'Tasks',
        labels: 'Labels',
      },
    },
    views: {
      session: {
        new: {
          signIn: 'Login',
          submit: 'Login',
        },
      },
      users: {
        id: 'ID',
        email: 'Email',
        createdAt: 'Created at',
        new: {
          submit: 'Register',
          signUp: 'Register',
        },
        change: 'Change',
        delete: 'Delete',
        actions: 'Actions',
      },
      welcome: {
        index: {
          hello: 'Hello from Hexlet!',
          description: 'Online programming school',
          more: 'Learn more',
        },
      },
      user: {
        firstName: 'Name',
        lastName: 'Surname',
        email: 'Email',
        password: 'Password',
        new: {
          submit: 'Save',
        },
        edit: {
          title: 'Change user',
          submit: 'Change',
        },
      },
      statuses: {
        title: 'Statuses',
        create: 'Create',
        id: 'ID',
        name: 'Name',
        createdAt: 'Created at',
        new: {
          title: 'Create status',
          submit: 'Create',
        },
        edit: {
          title: 'Update status',
          submit: 'Update',
        },
        change: 'Change',
        delete: 'Delete',
        actions: 'Actions',
      },
      tasks: {
        title: 'Tasks',
        create: 'Create',
        id: 'ID',
        name: 'Name',
        description: 'Description',
        createdAt: 'Created at',
        new: {
          title: 'Create task',
          submit: 'Create',
        },
        edit: {
          title: 'Update task',
          submit: 'Update',
        },
        change: 'Change',
        delete: 'Delete',
        actions: 'Actions',
      },
      task: {
        name: 'Task name',
        description: 'Description',
        statusId: 'Status',
        executorId: 'Executor',
      },
      taskStatus: {
        name: 'Name',
      },
      labels: {
        title: 'Labels',
        create: 'Create',
        id: 'ID',
        name: 'Name',
        createdAt: 'Created at',
        new: {
          title: 'Create label',
          submit: 'Create',
        },
        edit: {
          title: 'Update label',
          submit: 'Update',
        },
        change: 'Change',
        delete: 'Delete',
        actions: 'Actions',
      },
      label: {
        name: 'Label name',
      },
    },
  },
};
