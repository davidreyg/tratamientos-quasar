import { ProfileApi } from '../api';
import { UpdateUserDataRequest } from '../requests';

export class UpdateUserDataTask {
  static async run(data: UpdateUserDataRequest): Promise<void> {
    try {
      await ProfileApi.updatePassword(data);
    } catch (error) {
      throw error;
    }
  }
}
