import { sttpClient } from 'shared/api';
export interface ConfirmCurrentPasswordRequest {
  password: string;
}
export class ConfirmCurrentPasswordApi {
  private static _api = sttpClient;
  static async confirmCurrentPassword(data: ConfirmCurrentPasswordRequest) {
    return await ConfirmCurrentPasswordApi._api.post(
      '/confirm-current-password',
      data
    );
  }
}
