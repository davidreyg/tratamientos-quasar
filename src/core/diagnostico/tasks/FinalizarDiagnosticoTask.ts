import { DiagnosticoApi } from '../api';

export class FinalizarDiagnosticoTask {
  static async run(motivo: string, id: string): Promise<void> {
    try {
      await DiagnosticoApi.finalizarDiagnostico(motivo, id);
    } catch (error) {
      throw error;
    }
  }
}
