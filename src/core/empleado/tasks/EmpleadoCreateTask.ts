import { EmpleadoApi } from '../api';
import { EmpleadoRequest } from '../requests';

export class EmpleadoCreateTask {
  static async run(data: EmpleadoRequest): Promise<void> {
    try {
      await EmpleadoApi.create(data);
    } catch (error) {
      throw error;
    }
  }
}
