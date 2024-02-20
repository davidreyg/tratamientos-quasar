import { checkPrivilegio } from 'shared/middlewares';
import { RouteRecordRaw } from 'vue-router';
export const triajeRoutes = (): RouteRecordRaw[] => [
  {
    path: '/triajes',
    component: () => import('./TriajeIndex.vue'),
    beforeEnter: [checkPrivilegio],
    // name: 'triajes',
    children: [
      // {
      //   path: '',
      //   name: 'triajes.index',
      //   component: () => import('./pages/TipoDocumentoListPage.vue'),
      //   meta: { title: 'Tipo de documentos', action: 'new' },
      // },
      {
        path: 'registrar',
        name: 'triajes.create',
        component: () => import('./pages/TriajeRegistroPage.vue'),
        meta: { title: 'Registrar triaje', action: '' },
      },
      // {
      //   path: ':id/editar',
      //   name: 'triajes.edit',
      //   component: () => import('./pages/TipoDocumentoEditPage.vue'),
      //   props: (route) => ({ id: Number(route.params.id) }),
      //   meta: { title: 'Editar Tipo de documento', action: 'back' },
      // },
    ],
  },
];
