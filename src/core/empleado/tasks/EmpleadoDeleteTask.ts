import { EmpleadoApi } from '../api';

export class EmpleadoDeleteTask {
  static async run(id: number): Promise<void> {
    try {
      await EmpleadoApi.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
