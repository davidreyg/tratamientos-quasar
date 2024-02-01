import { DeleteRoleTask } from '../tasks';
export class DeleteRoleAction {
  static async run(roleId: string): Promise<void> {
    try {
      await DeleteRoleTask.run(roleId);
    } catch (error) {
      throw error;
    }
  }
}
