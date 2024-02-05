import { DiagnosticoApi } from '../api';

export class FinalizarDiagnosticoTask {
  static async run(id: string): Promise<void> {
    try {
      await DiagnosticoApi.finalizarDiagnostico(id);
    } catch (error) {
      throw error;
    }
  }
}
