import { AuthApi, LoginRequest, TokenData } from 'core/auth';
export class FetchTokenTask {
  static async run(data: LoginRequest): Promise<TokenData> {
    console.log('Retrieve token task..');
    try {
      const response = await AuthApi.login(data);

      return response.data().data;
    } catch (error) {
      throw error;
    }
  }
}
