import { sttpClient } from 'shared/api';
import { UpdatePasswordRequest } from '../requests';

export class ProfileApi {
  private static _api = sttpClient;

  static async updatePassword(
    data: UpdatePasswordRequest,
    user_id: string
  ): Promise<void> {
    await ProfileApi._api.patch(`/users/${user_id}/password`, data);
  }
}
