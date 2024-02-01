import { useAppStore } from 'src/stores/appStore';
import { LoginRequest } from '../requests';
import { FetchTokenTask, SaveTokenInLS } from '../tasks';
export class LoginAction {
  static async run(data: LoginRequest): Promise<void> {
    const { isAppLoading } = useAppStore();
    console.log('login action');
    try {
      isAppLoading(true);
      const response = await FetchTokenTask.run(data);
      SaveTokenInLS.run(response.access_token);
      // await RedirectAfterLoginTask.run();
      isAppLoading(false);
    } catch (error) {
      isAppLoading(false);
      throw error;
    }
  }
}
