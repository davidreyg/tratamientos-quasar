import { PacienteApi } from '../api';
import { PacienteRequest } from '../requests';

export class PacienteUpdateTask {
  static async run(data: PacienteRequest, id: string): Promise<void> {
    try {
      await PacienteApi.update(data, id);
    } catch (error) {
      throw error;
    }
  }
}
