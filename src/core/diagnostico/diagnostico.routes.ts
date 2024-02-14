import { checkPrivilegio } from 'shared/middlewares';
import { RouteRecordRaw } from 'vue-router';
export const diagnosticoRoutes = (): RouteRecordRaw[] => [
  {
    path: '/diagnosticos',
    component: () => import('./DiagnosticoIndex.vue'),
    // name: 'diagnosticos',
    beforeEnter: [checkPrivilegio],
    children: [
      {
        path: '',
        name: 'diagnosticos.index',
        component: () => import('./pages/DiagnosticoListPage.vue'),
        meta: { title: 'Diagnosticos', action: '' },
      },
      {
        path: 'formulario',
        name: 'diagnosticos.registrar',
        component: () => import('./pages/DiagnosticoCreate.vue'),
        meta: { title: 'Registrar Atención', action: '' },
      },
    ],
  },
];
