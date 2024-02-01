import { storeToRefs } from 'pinia';
import { useAppStore } from 'src/stores/appStore';
import { FetchAuthenticatedUserTask, StoreUserProfileInStore } from '../tasks';
export class FetchUserProfileAction {
  static async run(): Promise<void> {
    const { APP_LOADING } = storeToRefs(useAppStore());
    try {
      APP_LOADING.value = true;
      const user = await FetchAuthenticatedUserTask.run();

      StoreUserProfileInStore.run({
        user: user.user.data,
        roles: user.roles.data,
      });
      APP_LOADING.value = false;
    } catch (error) {
      APP_LOADING.value = false;
      throw error;
    }
  }
}
