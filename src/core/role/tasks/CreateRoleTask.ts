import { RoleApi } from '../api';
import { CreateRoleRequest } from '../requests';

export class CreateRoleTask {
  static async run(data: CreateRoleRequest): Promise<void> {
    try {
      await RoleApi.store(data);
    } catch (error) {
      throw error;
    }
  }
}
