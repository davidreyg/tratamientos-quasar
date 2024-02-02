import { Persona } from '../models';
import { PersonaFetchByNumeroDocumentoTask } from '../tasks/PersonaFetchByNumeroDocumentoTask';
export class PersonaFetchByNumeroDocumentoAction {
  static async run(numero_documento: string): Promise<Persona> {
    try {
      return await PersonaFetchByNumeroDocumentoTask.run(numero_documento);
    } catch (error) {
      throw error;
    }
  }
}
