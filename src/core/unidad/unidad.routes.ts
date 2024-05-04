import { checkPrivilegio } from 'shared/middlewares/CheckPrivilegioMiddleware';
import { RouteRecordRaw } from 'vue-router';
export const unidadRoutes = (): RouteRecordRaw[] => [
  {
    path: '/unidades',
    component: () => import('./UnidadIndex.vue'),
    beforeEnter: [checkPrivilegio],
    // name: 'unidads',
    children: [
      {
        path: '',
        name: 'unidads.index',
        component: () => import('./pages/UnidadListPage.vue'),
        meta: { title: 'Unidades', action: 'new' },
      },
      {
        path: 'crear',
        name: 'unidads.create',
        component: () => import('./pages/UnidadCreatePage.vue'),
        meta: { title: 'Nueva Unidad', action: 'back' },
      },
      {
        path: ':id/editar',
        name: 'unidads.edit',
        component: () => import('./pages/UnidadEditPage.vue'),
        props: (route) => ({ id: Number(route.params.id) }),
        meta: { title: 'Editar Unidad', action: 'back' },
      },
    ],
  },
];
