import { NotifyUtils } from 'shared/utils';
import { PersonaApi } from '../api';
import { Reniec } from '../models/Reniec';

export class PersonaFetchReniecTask {
  static async run(numero_documento: number): Promise<Reniec> {
    try {
      const response = await PersonaApi.fetchReniecByDNI(numero_documento);
      return response.data();
    } catch (error) {
      NotifyUtils.error('Hubo un error al traer los tipos de documentos...');
      throw error;
    }
  }
}
