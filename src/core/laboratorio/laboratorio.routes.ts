import { checkPrivilegio } from 'shared/middlewares/CheckPrivilegioMiddleware';
import { RouteRecordRaw } from 'vue-router';
export const laboratorioRoutes = (): RouteRecordRaw[] => [
  {
    path: '/laboratorio',
    component: () => import('./LaboratorioIndex.vue'),
    // name: 'laboratorio',
    beforeEnter: [checkPrivilegio],
    children: [
      {
        path: 'buscar-orden',
        name: 'laboratorio.listar-ordens',
        component: () => import('./pages/OrdenListPage.vue'),
        meta: { title: 'Buscar Ordenes', action: '' },
      },
      {
        path: 'registrar-orden',
        name: 'laboratorio.orden',
        component: () => import('./pages/RegistrarOrdenPage.vue'),
        meta: { title: 'Registrar Orden de Laboratorio', action: '' },
      },
      {
        path: 'registrar-resultados',
        name: 'laboratorio.registrar',
        component: () => import('./pages/RegistrarResultadosPage.vue'),
        meta: { title: 'Registrar Resultados', action: '' },
      },
      {
        path: 'verificar-resultados',
        name: 'laboratorio.verificar',
        component: () => import('./pages/VerificarResultadosPage.vue'),
        meta: { title: 'Verificar Resultados', action: '' },
      },
      {
        path: 'conteo-examenes',
        name: 'laboratorio.conteo',
        component: () => import('./pages/ExamenConteoPage.vue'),
        meta: { title: 'Reporte de Examenes', action: '' },
      },
    ],
  },
];
