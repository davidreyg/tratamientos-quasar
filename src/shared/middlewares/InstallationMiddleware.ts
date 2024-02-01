import { GetStepTask } from 'core/installation';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { InstallationManager } from '..';

export const installationMiddleware = async function (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  await GetStepTask.run();
  if (!InstallationManager.isCompleted()) {
    console.log('redirect to installation');
    return next('/installation');
  } else {
    return next();
  }
};
