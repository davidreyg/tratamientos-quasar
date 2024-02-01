import { InstallationManager, NotifyUtils, useResetStore } from 'shared/utils';
import { useAppStore } from 'src/stores/appStore';
import { DestroyTokenTask, RedirectAfterLogoutTask } from '../tasks';
export class LogoutAction {
  static async run(): Promise<void> {
    const { isAppLoading } = useAppStore();
    try {
      isAppLoading(true);
      await DestroyTokenTask.run();
      const resetPiniaStore = useResetStore();
      InstallationManager.removeProfileToken();
      await RedirectAfterLogoutTask.run();
      resetPiniaStore.all();
      NotifyUtils.success('Sesión cerrada correctamente :)');
      isAppLoading(false);
    } catch (error) {
      isAppLoading(false);
      throw error;
    }
  }
}
