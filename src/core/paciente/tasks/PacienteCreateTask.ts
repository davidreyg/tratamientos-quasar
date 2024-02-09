import { PacienteApi } from '../api';
import { PacienteRequest } from '../requests';

export class PacienteCreateTask {
  static async run(data: PacienteRequest): Promise<void> {
    try {
      await PacienteApi.create(data);
    } catch (error) {
      throw error;
    }
  }
}
