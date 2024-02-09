import { TipoDocumentoApi } from '../api';
import { TipoDocumento } from '../models';

export class TipoDocumentoFetchByIdTask {
  static async run(id: number): Promise<TipoDocumento> {
    try {
      return (await TipoDocumentoApi.fetchOne(id)).data().data;
    } catch (error) {
      throw error;
    }
  }
}
