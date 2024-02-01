import { RoleApi } from '../api';

export class DeleteRoleTask {
  static async run(roleId: string): Promise<void> {
    try {
      await RoleApi.destroy(roleId);
    } catch (error) {
      throw error;
    }
  }
}
