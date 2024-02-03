import { NotifyUtils } from 'shared/utils';
import { PersonaApi } from '../api';
import { Persona } from '../models';

export class PersonaFetchByNumeroDocumentoTask {
  static async run(numero_documento: number): Promise<Persona> {
    try {
      const response = await PersonaApi.fetchByNumeroDocumento(
        numero_documento
      );

      return response.data().data[0];
    } catch (error) {
      NotifyUtils.error('Hubo un error al traer los tipos de documentos...');
      throw error;
    }
  }
}
