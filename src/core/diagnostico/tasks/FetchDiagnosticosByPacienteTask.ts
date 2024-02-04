import { DiagnosticoApi } from '../api';
import { Diagnostico } from '../models';

export class FetchDiagnosticosByPacienteTask {
  static async run(paciente_id: string): Promise<Diagnostico[]> {
    try {
      const response = await DiagnosticoApi.fetchDiagnosticosByPaciente(
        paciente_id
      );
      return response.data().data;
    } catch (error) {
      throw error;
    }
  }
}
