import { checkPrivilegio } from 'shared/middlewares/CheckPrivilegioMiddleware';
import { RouteRecordRaw } from 'vue-router';
export const empleadoRoutes = (): RouteRecordRaw[] => [
  {
    path: '/empleados',
    component: () => import('./EmpleadoIndex.vue'),
    // name: 'empleados',
    beforeEnter: [checkPrivilegio],
    children: [
      {
        path: '',
        name: 'empleados.index',
        component: () => import('./pages/EmpleadoListPage.vue'),
        meta: { title: 'Empleados', action: 'new' },
      },
      {
        path: 'crear',
        name: 'empleados.create',
        component: () => import('./pages/EmpleadoCreatePage.vue'),
        meta: { title: 'Nuevo Empleado', action: 'back' },
      },
      {
        path: ':id/edit',
        name: 'empleados.edit',
        component: () => import('./pages/EmpleadoEditPage.vue'),
        props: (route) => ({ id: Number(route.params.id) }),
        meta: { title: 'Editar Empleado', action: 'back' },
      },
    ],
  },
];
