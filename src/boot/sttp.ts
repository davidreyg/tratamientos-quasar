import { boot } from 'quasar/wrappers';
import { sttpClient } from 'shared/api';
import { setLocale } from 'yup';
import { es } from 'yup-locales';

export default boot(async ({ router }) => {
  // something to do
  setLocale(es);
  sttpClient.initHttp(router);
});
