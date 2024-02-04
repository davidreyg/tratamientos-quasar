import { DiagnosticoApi } from '../api';
import { Diagnostico } from '../models';

export class FetchDiagnosticoByIdTask {
  static async run(id: string): Promise<Diagnostico> {
    try {
      const response = await DiagnosticoApi.fetchDiagnosticoById(id);
      return response.data().data;
    } catch (error) {
      throw error;
    }
  }
}
