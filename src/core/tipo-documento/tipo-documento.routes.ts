import { checkPrivilegio } from 'shared/middlewares';
import { RouteRecordRaw } from 'vue-router';
export const tipoDocumentoRoutes = (): RouteRecordRaw[] => [
  {
    path: '/tipo-documentos',
    component: () => import('./TipoDocumentoIndex.vue'),
    beforeEnter: [checkPrivilegio],
    // name: 'tipo-documentos',
    children: [
      {
        path: '',
        name: 'tipo-documentos.index',
        component: () => import('./pages/TipoDocumentoListPage.vue'),
        meta: { title: 'Tipo de documentos', action: 'new' },
      },
      {
        path: 'crear',
        name: 'tipo-documentos.create',
        component: () => import('./pages/TipoDocumentoCreatePage.vue'),
        meta: { title: 'Nuevo Tipo de Documento', action: 'back' },
      },
      {
        path: ':id/editar',
        name: 'tipo-documentos.edit',
        component: () => import('./pages/TipoDocumentoEditPage.vue'),
        props: (route) => ({ id: Number(route.params.id) }),
        meta: { title: 'Editar Tipo de documento', action: 'back' },
      },
    ],
  },
];
