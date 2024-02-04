import { ControlApi } from '../api';
import { Control } from '../models';

export class FetchControlesByPacienteTask {
  static async run(diagnostico_id: string): Promise<Control[]> {
    try {
      const response = await ControlApi.fetchControlesByDiagnostico(
        diagnostico_id
      );
      return response.data().data;
    } catch (error) {
      throw error;
    }
  }
}
