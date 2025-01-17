import { categoriaRoutes } from 'core/categoria/categoria.routes';
import { diagnosticoRoutes } from 'core/diagnostico';
import { empleadoRoutes } from 'core/empleado';
import { establecimientoRoutes } from 'core/establecimiento/establecimiento.routes';
import { examenRoutes } from 'core/examen';
import { itemRoutes } from 'core/item/item.routes';
import { laboratorioRoutes } from 'core/laboratorio';
import { paqueteRoutes } from 'core/paquete';
import { respuestaRoutes } from 'core/respuesta/respuesta.routes';
import { roleRoutes } from 'core/role';
import { seccionRoutes } from 'core/seccion/seccion.routes';
import { tipoDocumentoRoutes } from 'core/tipo-documento';
import { triajeRoutes } from 'core/triaje';
import { unidadRoutes } from 'core/unidad/unidad.routes';
import { userRoutes } from 'core/user';
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
      ...tipoDocumentoRoutes(),
      ...roleRoutes(),
      ...empleadoRoutes(),
      ...diagnosticoRoutes(),
      ...triajeRoutes(),
      ...userRoutes(),
      ...laboratorioRoutes(),
      ...paqueteRoutes(),
      ...examenRoutes(),
      ...categoriaRoutes(),
      ...itemRoutes(),
      ...unidadRoutes(),
      ...seccionRoutes(),
      ...establecimientoRoutes(),
      ...respuestaRoutes(),
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
