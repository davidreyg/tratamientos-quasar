import { RouteRecordRaw } from 'vue-router';
export const empleadoRoutes = (): RouteRecordRaw[] => [
  {
    path: '/empleados',
    component: () => import('./EmpleadoIndex.vue'),
    // name: 'empleados',
    children: [
      {
        path: '',
        name: 'empleados.index',
        component: () => import('./pages/EmpleadoListPage.vue'),
        meta: { title: 'Empleados', action: 'new' },
      },
      // {
      //   path: 'crear',
      //   name: 'empleados.create',
      //   component: () => import('./pages/EmpleadoCreatePage.vue'),
      //   meta: { title: 'Nuevo Empleado', action: 'back' },
      // },
      // {
      //   path: ':id/privilegios',
      //   name: 'empleados.privilegios',
      //   component: () => import('./pages/EmpleadoPrivilegiosPage.vue'),
      //   props: (route) => ({ id: Number(route.params.id) }),
      //   meta: { title: 'Privilegios del Rol', action: 'back' },
      // },
    ],
  },
];
