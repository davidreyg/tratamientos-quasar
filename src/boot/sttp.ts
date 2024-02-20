import { FetchUserProfileAction } from 'core/auth';
import { boot } from 'quasar/wrappers';
import { sttpClient } from 'shared/api';
import { TokenManager } from 'shared/utils';
import { setLocale } from 'yup';
import { es } from 'yup-locales';

export default boot(async ({ router, urlPath }) => {
  // something to d
  setLocale(es);
  sttpClient.initHttp(router);
  if (TokenManager.hasAccessToken()) {
    try {
      await FetchUserProfileAction.run();
    } catch (error) {
      if (!urlPath.startsWith('/login')) {
        return Promise.reject({ url: '/login' });
      }
      throw error;
    }
  }
});
