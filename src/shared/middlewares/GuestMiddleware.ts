import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { TokenManager } from '../utils';

export const guest = async function authMiddleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  if (TokenManager.hasAccessToken() && from.path != to.path) {
    next('/');
    return false;
  } else {
    next();
    return;
  }
};
