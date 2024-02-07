import { PersonaApi } from '../api';
import { Reniec } from '../models/Reniec';

export class PersonaFetchReniecTask {
  static async run(numero_documento: number): Promise<Reniec> {
    try {
      const response = await PersonaApi.fetchReniecByDNI(numero_documento);
      return response.data().data;
    } catch (error) {
      throw error;
    }
  }
}
