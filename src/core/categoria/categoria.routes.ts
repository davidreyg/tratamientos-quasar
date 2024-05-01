import { checkPrivilegio } from 'shared/middlewares/CheckPrivilegioMiddleware';
import { RouteRecordRaw } from 'vue-router';
export const categoriaRoutes = (): RouteRecordRaw[] => [
  {
    path: '/categorias',
    component: () => import('./CategoriaIndex.vue'),
    // name: 'categorias',
    beforeEnter: [checkPrivilegio],
    children: [
      {
        path: '',
        name: 'categorias.index',
        component: () => import('./pages/CategoriaListPage.vue'),
        meta: { title: 'Categorias', action: 'new' },
      },
      {
        path: 'crear',
        name: 'categorias.create',
        component: () => import('./pages/CategoriaCreatePage.vue'),
        meta: { title: 'Nueva Categoria', action: 'back' },
      },
      {
        path: ':id/editar',
        name: 'categorias.edit',
        component: () => import('./pages/CategoriaEditPage.vue'),
        props: (route) => ({ id: Number(route.params.id) }),
        meta: { title: 'Editar Categoria', action: 'back' },
      },
    ],
  },
];
