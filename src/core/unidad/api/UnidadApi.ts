import { sttpClient } from 'shared/api';
import { Unidad } from '../models';
import { UnidadRequest } from '../requests';

export class UnidadApi {
  private static _api = sttpClient;
  private static _endpoint = '/unidads';

  static async fetchAll(query?: object) {
    return await UnidadApi._api.get<Unidad[]>(UnidadApi._endpoint, {
      limit: 0,
      ...query,
    });
  }
  static async fetchOne(id: number) {
    return await UnidadApi._api.get<Unidad>(`${UnidadApi._endpoint}/${id}`);
  }

  static async create(data: UnidadRequest) {
    return await UnidadApi._api.post<void>(UnidadApi._endpoint, data);
  }

  static async destroy(id: number) {
    return await UnidadApi._api.delete(`${UnidadApi._endpoint}/${id}`);
  }

  static async update(data: UnidadRequest, id: number) {
    return await UnidadApi._api.patch(`${UnidadApi._endpoint}/${id}`, data);
  }
}
