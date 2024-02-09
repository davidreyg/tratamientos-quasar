import { NotifyUtils } from 'shared/utils';
import { TipoDocumentoApi } from '../api';
import { TipoDocumento } from '../models';

export class FetchAllTipoDocumentosTask {
  static async run(): Promise<TipoDocumento[]> {
    try {
      const response = await TipoDocumentoApi.fetchAll();

      return response.data().data;
    } catch (error) {
      NotifyUtils.error('Hubo un error al traer los tipos de documentos...');
      throw error;
    }
  }
}
