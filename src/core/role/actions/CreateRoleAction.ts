import { CreateRoleRequest } from '../requests';
import { CreateRoleTask } from '../tasks';
export class CreateRoleAction {
  static async run(data: CreateRoleRequest): Promise<void> {
    try {
      await CreateRoleTask.run(data);
    } catch (error) {
      throw error;
    }
  }
}
