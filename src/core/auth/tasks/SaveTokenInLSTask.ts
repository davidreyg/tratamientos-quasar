import { TokenManager } from 'shared/utils';

export class SaveTokenInLS {
  static run(token: string): void {
    console.log('Store token to LS task..');
    try {
      TokenManager.setToken(token);
    } catch (error) {
      throw error;
    }
  }
}
