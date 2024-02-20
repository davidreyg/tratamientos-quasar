import { checkPrivilegio } from 'shared/middlewares/CheckPrivilegioMiddleware';
import { RouteRecordRaw } from 'vue-router';
export const userRoutes = (): RouteRecordRaw[] => [
  {
    path: '/users',
    component: () => import('./UserIndex.vue'),
    beforeEnter: [checkPrivilegio],
    // name: 'users',
    children: [
      {
        path: '',
        name: 'users.index',
        component: () => import('./pages/UserListPage.vue'),
        meta: { title: 'Usuarios', action: 'new' },
      },
      // {
      //   path: 'crear',
      //   name: 'users.create',
      //   component: () => import('./pages/UserCreatePage.vue'),
      //   meta: { title: 'Nuevo Usuario', action: 'back' },
      // },
      // {
      //   path: ':id/editar',
      //   name: 'users.edit',
      //   component: () => import('./pages/UserEditPage.vue'),
      //   props: (route) => ({ id: Number(route.params.id) }),
      //   meta: { title: 'Editar Usuario', action: 'back' },
      // },
    ],
  },
];
