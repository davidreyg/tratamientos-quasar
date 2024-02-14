import { checkPrivilegio } from 'shared/middlewares';
import { RouteRecordRaw } from 'vue-router';
export const roleRoutes = (): RouteRecordRaw[] => [
  {
    path: '/roles',
    component: () => import('./RoleIndex.vue'),
    // name: 'roles',
    beforeEnter: [checkPrivilegio],
    children: [
      {
        path: '',
        name: 'roles.index',
        component: () => import('./pages/RoleListPage.vue'),
        meta: { title: 'Roles', action: 'new' },
      },
      // {
      //   path: 'crear',
      //   name: 'roles.create',
      //   component: () => import('./pages/RoleCreatePage.vue'),
      //   meta: { title: 'Nuevo Tipo de Documento', action: 'back' },
      // },
      {
        path: ':id/privilegios',
        name: 'roles.privilegios',
        component: () => import('./pages/RolePrivilegiosPage.vue'),
        props: (route) => ({ id: Number(route.params.id) }),
        meta: { title: 'Privilegios del Rol', action: 'back' },
      },
    ],
  },
];
