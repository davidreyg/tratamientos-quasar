import { checkPrivilegio } from 'shared/middlewares/CheckPrivilegioMiddleware';
import { RouteRecordRaw } from 'vue-router';
export const paqueteRoutes = (): RouteRecordRaw[] => [
  {
    path: '/paquetes',
    component: () => import('./PaqueteIndex.vue'),
    beforeEnter: [checkPrivilegio],
    // name: 'paquetes',
    children: [
      {
        path: '',
        name: 'paquetes.index',
        component: () => import('./pages/PaqueteListPage.vue'),
        meta: { title: 'Paquetes', action: 'new' },
      },
      {
        path: 'crear',
        name: 'paquetes.create',
        component: () => import('./pages/PaqueteCreatePage.vue'),
        meta: { title: 'Nuevo Paquete', action: 'back' },
      },
      {
        path: ':id/editar',
        name: 'paquetes.edit',
        component: () => import('./pages/PaqueteEditPage.vue'),
        props: (route) => ({ id: Number(route.params.id) }),
        meta: { title: 'Editar Paquete', action: 'back' },
      },
    ],
  },
];
