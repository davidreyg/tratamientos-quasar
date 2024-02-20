import { checkPrivilegio } from 'shared/middlewares/CheckPrivilegioMiddleware';
import { RouteRecordRaw } from 'vue-router';
import DiagnosticoCreate from './pages/DiagnosticoCreate.vue';
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
        component: DiagnosticoCreate,
        meta: { title: 'Registrar Atención', action: '' },
      },
    ],
  },
];
