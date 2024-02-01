import { AuthApi, ProfileResponse } from 'core/auth';
export class FetchAuthenticatedUserTask {
  static async run(): Promise<ProfileResponse> {
    console.log(
      '🚀 ~ file: FetchAuthenticatedUserTask.ts:4 ~ Fetching Authenticated user:'
    );

    try {
      const response = await AuthApi.fetchAuthenticatedUser();
      return response.data().data;
    } catch (error) {
      throw error;
    }
  }
}
