import { boot } from 'quasar/wrappers';
import { setupCalendar } from 'v-calendar';

// Use calendar defaults (optional)
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  // something to do
  app.use(setupCalendar, {});
  // await GetStepTask.run();
});
