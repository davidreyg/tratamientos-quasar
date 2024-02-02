import { PersonaApi } from '../api';
import { PersonaRequest } from '../requests';

export class UpdatePacienteTask {
  static async run(data: PersonaRequest, id: string): Promise<void> {
    try {
      await PersonaApi.update(data, id);
    } catch (error) {
      throw error;
    }
  }
}
