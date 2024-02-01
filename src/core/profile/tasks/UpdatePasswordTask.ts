import { useAuthStore } from 'core/auth/stores';
import { ProfileApi } from '../api';
import { UpdatePasswordRequest } from '../requests';

export class UpdateUserDataTask {
  static async run(data: UpdatePasswordRequest): Promise<void> {
    try {
      const { user } = useAuthStore();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await ProfileApi.updatePassword(data, user!.id);
    } catch (error) {
      throw error;
    }
  }
}
