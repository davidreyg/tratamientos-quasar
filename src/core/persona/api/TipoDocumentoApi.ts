import { sttpClient } from 'shared/api';
import { TipoDocumento } from '../models';

export class TipoDocumentoApi {
  private static _api = sttpClient;
  private static _endpoint = '/tipo-documentos';

  static async fetchAll() {
    return await TipoDocumentoApi._api.get<TipoDocumento[]>(
      TipoDocumentoApi._endpoint
    );
  }
}
