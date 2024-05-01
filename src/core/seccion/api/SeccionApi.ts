import { sttpClient } from 'shared/api';
import { Secccion } from '../models';

export class SeccionApi {
  private static _api = sttpClient;
  private static _endpoint = '/seccions';

  static async fetchAll(query?: object) {
    return await SeccionApi._api.get<Secccion[]>(SeccionApi._endpoint, {
      limit: 0,
      ...query,
    });
  }
}
