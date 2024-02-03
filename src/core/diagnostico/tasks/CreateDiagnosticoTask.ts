import { DiagnosticoApi } from '../api';
import { DiagnosticoCreateRequest } from '../requests';

export class CreateDiagnosticoTask {
  static async run(data: DiagnosticoCreateRequest): Promise<void> {
    try {
      await DiagnosticoApi.create(data);
    } catch (error) {
      throw error;
    }
  }
}
