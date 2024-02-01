import { AuthApi } from 'core/auth';
import { TokenManager } from 'shared/utils';
export class DestroyTokenTask {
  static async run(): Promise<void> {
    console.log('Destroy token task..');
    try {
      await AuthApi.logout();
      TokenManager.removeAccessToken();
    } catch (error) {
      throw error;
    }
  }
}
