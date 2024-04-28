import { checkPrivilegio } from 'shared/middlewares/CheckPrivilegioMiddleware';
import { RouteRecordRaw } from 'vue-router';
export const examenRoutes = (): RouteRecordRaw[] => [
  {
    path: '/examens',
    component: () => import('./ExamenIndex.vue'),
    beforeEnter: [checkPrivilegio],
    // name: 'examens',
    children: [
      {
        path: '',
        name: 'examens.index',
        component: () => import('./pages/ExamenListPage.vue'),
        meta: { title: 'Exámenes', action: 'new' },
      },
      {
        path: 'crear',
        name: 'examens.create',
        component: () => import('./pages/ExamenCreatePage.vue'),
        meta: { title: 'Nuevo Paquete', action: 'back' },
      },
      // {
      //   path: ':id/editar',
      //   name: 'examens.edit',
      //   component: () => import('./pages/PaqueteEditPage.vue'),
      //   props: (route) => ({ id: Number(route.params.id) }),
      //   meta: { title: 'Editar Paquete', action: 'back' },
      // },
    ],
  },
];
