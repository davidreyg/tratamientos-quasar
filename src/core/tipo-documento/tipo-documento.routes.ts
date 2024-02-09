import { RouteRecordRaw } from 'vue-router';
export const tipoDocumentoRoutes = (): RouteRecordRaw[] => [
  {
    path: '/tipo-documentos',
    name: 'tipo-documentos',
    children: [
      {
        path: '',
        name: 'tipo-documentos.index',
        component: () => import('./pages/TipoDocumentoIndex.vue'),
      },
      {
        path: 'crear',
        name: 'tipo-documentos.create',
        component: () => import('./pages/TipoDocumentoCreatePage.vue'),
      },
      {
        path: ':id/editar',
        name: 'tipo-documentos.edit',
        component: () => import('./pages/TipoDocumentoEditPage.vue'),
        props: (route) => ({ id: Number(route.params.id) }),
      },
    ],
  },
];
