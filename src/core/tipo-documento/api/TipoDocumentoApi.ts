import { sttpClient } from 'shared/api';
import { TipoDocumento } from '../models';
import { TipoDocumentoRequest } from '../requests';

export class TipoDocumentoApi {
  private static _api = sttpClient;
  private static _endpoint = '/tipo-documentos';

  static async fetchAll() {
    return await TipoDocumentoApi._api.get<TipoDocumento[]>(
      TipoDocumentoApi._endpoint
    );
  }

  static async fetchOne(id: number) {
    return await TipoDocumentoApi._api.get<TipoDocumento>(
      `${TipoDocumentoApi._endpoint}/${id}`
    );
  }

  static async create(data: TipoDocumentoRequest) {
    return await TipoDocumentoApi._api.post<void>(
      TipoDocumentoApi._endpoint,
      data
    );
  }

  static async destroy(id: number) {
    return await TipoDocumentoApi._api.delete(
      `${TipoDocumentoApi._endpoint}/${id}`
    );
  }

  static async update(data: TipoDocumentoRequest, id: number) {
    return await TipoDocumentoApi._api.patch(
      `${TipoDocumentoApi._endpoint}/${id}`,
      data
    );
  }
}
