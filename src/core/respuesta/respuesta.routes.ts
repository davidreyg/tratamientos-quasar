import { checkPrivilegio } from 'shared/middlewares/CheckPrivilegioMiddleware';
import { RouteRecordRaw } from 'vue-router';
export const respuestaRoutes = (): RouteRecordRaw[] => [
  {
    path: '/respuestas',
    component: () => import('./RespuestaIndex.vue'),
    beforeEnter: [checkPrivilegio],
    // name: 'respuestas',
    children: [
      {
        path: '',
        name: 'respuestas.index',
        component: () => import('./pages/RespuestaListPage.vue'),
        meta: { title: 'Respuestas', action: 'new' },
      },
      {
        path: 'crear',
        name: 'respuestas.create',
        component: () => import('./pages/RespuestaCreatePage.vue'),
        meta: { title: 'Nueva Respuesta', action: 'back' },
      },
      {
        path: ':id/editar',
        name: 'respuestas.edit',
        component: () => import('./pages/RespuestaEditPage.vue'),
        props: (route) => ({ id: Number(route.params.id) }),
        meta: { title: 'Editar Respuesta', action: 'back' },
      },
    ],
  },
];
