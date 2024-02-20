import { FetchUserProfileAction } from 'core/auth';
import { useAuthStore } from 'core/auth/stores';
import { storeToRefs } from 'pinia';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export const profile = async function authMiddleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const { user } = storeToRefs(useAuthStore());
  // console.log(user.value);
  if (!user.value) {
    await FetchUserProfileAction.run();
  }
  return next();
};
