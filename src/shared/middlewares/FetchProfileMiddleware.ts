import { FetchUserProfileAction } from 'core/auth';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { TokenManager } from '../utils';

export const profile = async function authMiddleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  if (TokenManager.hasAccessToken()) {
    try {
      await FetchUserProfileAction.run();
    } catch (error) {
      TokenManager.removeAccessToken();
      throw error;
    }
    return next();
  } else {
    return next('/login');
  }
};
