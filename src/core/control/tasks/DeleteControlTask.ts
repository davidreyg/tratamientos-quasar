import { ControlApi } from '../api';

export class DeleteControlTask {
  static async run(control_id: string): Promise<void> {
    try {
      await ControlApi.delete(control_id);
    } catch (error) {
      throw error;
    }
  }
}
