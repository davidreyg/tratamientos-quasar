import { RouteRecordRaw } from 'vue-router';
export const diagnosticoRoutes = (): RouteRecordRaw[] => [
  {
    path: '/diagnosticos',
    component: () => import('./DiagnosticoIndex.vue'),
    // name: 'diagnosticos',
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
