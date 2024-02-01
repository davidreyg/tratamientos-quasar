import { LoginRequest, ProfileResponse, TokenData } from 'core/auth';
import { sttpClient } from 'shared/api';

export class AuthApi {
  private static _api = sttpClient;

  static async login(data: LoginRequest) {
    return await AuthApi._api.post<TokenData, LoginRequest>(
      '/clients/web/login',
      data
    );
  }

  static async logout() {
    return await AuthApi._api.post('/api/logout');
  }

  static async fetchAuthenticatedUser() {
    return await AuthApi._api.get<ProfileResponse>('/profile');
  }
}
