import { diagnosticoRoutes } from 'core/diagnostico';
import { empleadoRoutes } from 'core/empleado';
import { roleRoutes } from 'core/role';
import { tipoDocumentoRoutes } from 'core/tipo-documento';
import MainLayout from 'shared/layouts/MainLayout.vue';
import { auth, guest, profile } from 'shared/middlewares';
import { RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    meta: {
      middleware: [],
    },
    children: [
      { path: '', component: () => import('shared/pages/IndexPage.vue') },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('core/profile/pages/ProfilePage.vue'),
      },
      // {
      //   path: 'diagnosticos',
      //   name: 'diagnosticos',
      //   children: [
      //     {
      //       path: '',
      //       name: 'diagnosticos.registrar',
      //       component: DiagnosticoCreate,
      //     },
      //     // {
      //     //   path: 'editar-diagnostico',
      //     //   name: 'diagnosticos.create',
      //     //   component: () =>
      //     //     import('core/diagnostico/pages/DiagnosticoEdit.vue'),
      //     // },
      //   ],
      // },
      ...tipoDocumentoRoutes(),
      ...roleRoutes(),
      ...empleadoRoutes(),
      ...diagnosticoRoutes(),
    ],
    beforeEnter: [auth, profile],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('core/auth/pages/LoginPage.vue'),
    beforeEnter: [guest],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('shared/pages/ErrorNotFound.vue'),
  },
];

export default routes;
