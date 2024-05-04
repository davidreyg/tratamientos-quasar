import { sttpClient } from 'shared/api';
import { Seccion } from '../models';
import { SeccionRequest } from '../requests';

export class SeccionApi {
  private static _api = sttpClient;
  private static _endpoint = '/seccions';

  static async fetchAll(query?: object) {
    return await SeccionApi._api.get<Seccion[]>(SeccionApi._endpoint, {
      limit: 0,
      ...query,
    });
  }

  static async fetchOne(id: number) {
    return await SeccionApi._api.get<Seccion>(`${SeccionApi._endpoint}/${id}`);
  }

  static async create(data: SeccionRequest) {
    return await SeccionApi._api.post<void>(SeccionApi._endpoint, data);
  }

  static async destroy(id: number) {
    return await SeccionApi._api.delete(`${SeccionApi._endpoint}/${id}`);
  }

  static async update(data: SeccionRequest, id: number) {
    return await SeccionApi._api.patch(`${SeccionApi._endpoint}/${id}`, data);
  }
}
