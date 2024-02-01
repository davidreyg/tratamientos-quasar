import { sttpClient } from 'shared/api';
import { UpdateUserDataRequest } from '../requests';

export class ProfileApi {
  private static _api = sttpClient;

  static async updatePassword(data: UpdateUserDataRequest): Promise<void> {
    await ProfileApi._api.put('/profile/update-user-data', data);
  }
}
