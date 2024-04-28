import { sttpClient } from 'shared/api';
import { Unidad } from '../models';

export class UnidadApi {
  private static _api = sttpClient;
  private static _endpoint = '/unidads';

  static async fetchAll(query?: object) {
    return await UnidadApi._api.get<Unidad[]>(UnidadApi._endpoint, {
      limit: 0,
      ...query,
    });
  }
}
