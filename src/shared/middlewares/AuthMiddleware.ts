import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { TokenManager } from '../utils';

export const auth = async function authMiddleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  if (!TokenManager.hasAccessToken()) {
    console.log('auth');
    return next('/login');
  } else {
    console.log('auth');
    return next();
  }
};
