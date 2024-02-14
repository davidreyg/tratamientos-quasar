import { useAuthStore } from 'core/auth/stores';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { NotifyUtils } from '../utils';

export const checkPrivilegio = async function authMiddleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const { privilegios } = useAuthStore();
  const pri = privilegios
    .map((p) => p.ruta)
    .filter((p) => p !== undefined)
    .filter((p) => p !== null);
  // console.log(pri, to);
  if (
    pri.some((v) =>
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      to.path.toLocaleLowerCase().includes(v!.toLocaleLowerCase())
    )
  ) {
    // console.log('siiiiiiiiiiiiiiiiiiiiiiiii');
    return next();
  } else {
    NotifyUtils.error('No estas autorizado para ingresar a esta página');
    return next(from.path);
  }
};
