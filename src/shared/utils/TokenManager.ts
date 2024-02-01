import { LocalStorage } from 'quasar';

export class TokenManager {
  constructor() {
    LocalStorage.set(process.env.ACCESS_TOKEN, null);
  }

  static get access_token() {
    return LocalStorage.getItem<string>(process.env.ACCESS_TOKEN);
  }

  static hasAccessToken(): boolean {
    return !!TokenManager.access_token;
  }

  static removeAccessToken() {
    LocalStorage.remove(process.env.ACCESS_TOKEN);
  }

  static setToken(access_token: string) {
    LocalStorage.set(process.env.ACCESS_TOKEN, access_token);
  }
}
