import { checkPrivilegio } from 'shared/middlewares/CheckPrivilegioMiddleware';
import { RouteRecordRaw } from 'vue-router';
export const itemRoutes = (): RouteRecordRaw[] => [
  {
    path: '/items',
    component: () => import('./ItemIndex.vue'),
    beforeEnter: [checkPrivilegio],
    // name: 'items',
    children: [
      {
        path: '',
        name: 'items.index',
        component: () => import('./pages/ItemListPage.vue'),
        meta: { title: 'Items', action: 'new' },
      },
      {
        path: 'crear',
        name: 'items.create',
        component: () => import('./pages/ItemCreatePage.vue'),
        meta: { title: 'Nuevo Item', action: 'back' },
      },
      {
        path: ':id/editar',
        name: 'items.edit',
        component: () => import('./pages/ItemEditPage.vue'),
        props: (route) => ({ id: Number(route.params.id) }),
        meta: { title: 'Editar Item', action: 'back' },
      },
    ],
  },
];
