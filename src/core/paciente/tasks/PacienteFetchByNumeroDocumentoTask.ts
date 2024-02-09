import { PacienteApi } from '../api';
import { Paciente } from '../models';

export class PacienteFetchByNumeroDocumentoTask {
  static async run(numero_documento: number): Promise<Paciente> {
    try {
      const response = await PacienteApi.fetchAll({
        search: `numero_documento:${numero_documento}`,
      });

      return response.data().data[0];
    } catch (error) {
      // NotifyUtils.error('Hubo un error al traer los tipos de documentos...');
      throw error;
    }
  }
}
