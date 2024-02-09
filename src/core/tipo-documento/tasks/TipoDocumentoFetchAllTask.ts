import { TipoDocumentoApi } from '../api';
import { TipoDocumento } from '../models';

export class TipoDocumentoFetchAllTask {
  static async run(): Promise<TipoDocumento[]> {
    try {
      const response = await TipoDocumentoApi.fetchAll();

      return response.data().data;
    } catch (error) {
      throw error;
    }
  }
}
