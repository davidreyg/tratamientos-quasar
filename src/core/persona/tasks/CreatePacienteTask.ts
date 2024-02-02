import { PersonaApi } from '../api';
import { PersonaRequest } from '../requests';

export class CreatePacienteTask {
  static async run(data: PersonaRequest): Promise<void> {
    try {
      await PersonaApi.create(data);
    } catch (error) {
      throw error;
    }
  }
}
