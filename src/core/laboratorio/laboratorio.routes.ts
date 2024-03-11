import { checkPrivilegio } from 'shared/middlewares/CheckPrivilegioMiddleware';
import { RouteRecordRaw } from 'vue-router';
export const laboratorioRoutes = (): RouteRecordRaw[] => [
  {
    path: '/laboratorio',
    component: () => import('./LaboratorioIndex.vue'),
    // name: 'laboratorio',
    beforeEnter: [checkPrivilegio],
    children: [
      // {
      //   path: '',
      //   name: 'laboratorio.index',
      //   component: () => import('./pages/DiagnosticoListPage.vue'),
      //   meta: { title: 'laboratorio', action: '' },
      // },
      {
        path: 'registrar-orden',
        name: 'laboratorio.orden',
        component: () => import('./pages/RegistrarOrdenPage.vue'),
        meta: { title: 'Registrar Orden de Laboratorio', action: '' },
      },
    ],
  },
];
