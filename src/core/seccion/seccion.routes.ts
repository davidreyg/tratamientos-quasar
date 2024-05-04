import { checkPrivilegio } from 'shared/middlewares/CheckPrivilegioMiddleware';
import { RouteRecordRaw } from 'vue-router';
export const seccionRoutes = (): RouteRecordRaw[] => [
  {
    path: '/secciones',
    component: () => import('./SeccionIndex.vue'),
    beforeEnter: [checkPrivilegio],
    // name: 'seccions',
    children: [
      {
        path: '',
        name: 'seccions.index',
        component: () => import('./pages/SeccionListPage.vue'),
        meta: { title: 'Secciones', action: 'new' },
      },
      {
        path: 'crear',
        name: 'seccions.create',
        component: () => import('./pages/SeccionCreatePage.vue'),
        meta: { title: 'Nueva Seccion', action: 'back' },
      },
      {
        path: ':id/editar',
        name: 'seccions.edit',
        component: () => import('./pages/SeccionEditPage.vue'),
        props: (route) => ({ id: Number(route.params.id) }),
        meta: { title: 'Editar Seccion', action: 'back' },
      },
    ],
  },
];
