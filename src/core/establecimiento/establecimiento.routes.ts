import { checkPrivilegio } from 'shared/middlewares/CheckPrivilegioMiddleware';
import { RouteRecordRaw } from 'vue-router';
export const establecimientoRoutes = (): RouteRecordRaw[] => [
  {
    path: '/establecimientos',
    component: () => import('./EstablecimientoIndex.vue'),
    beforeEnter: [checkPrivilegio],
    // name: 'establecimientos',
    children: [
      {
        path: '',
        name: 'establecimientos.index',
        component: () => import('./pages/EstablecimientoListPage.vue'),
        meta: { title: 'Establecimientos', action: 'new' },
      },
      {
        path: 'crear',
        name: 'establecimientos.create',
        component: () => import('./pages/EstablecimientoCreatePage.vue'),
        meta: { title: 'Nueva Establecimiento', action: 'back' },
      },
      {
        path: ':id/editar',
        name: 'establecimientos.edit',
        component: () => import('./pages/EstablecimientoEditPage.vue'),
        props: (route) => ({ id: Number(route.params.id) }),
        meta: { title: 'Editar Establecimiento', action: 'back' },
      },
    ],
  },
];
