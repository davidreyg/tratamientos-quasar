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
      {
        path: 'roles',
        name: 'roles',
        children: [
          {
            path: '',
            name: 'roles.index',
            component: () => import('core/role/pages/RoleIndex.vue'),
          },
          {
            path: 'create',
            name: 'roles.create',
            component: () => import('core/role/pages/RoleCreate.vue'),
          },
          {
            path: ':id/permissions',
            name: 'roles.permissions',
            component: () => import('core/role/pages/RolePermissionPage.vue'),
            props: true,
          },
        ],
      },
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
