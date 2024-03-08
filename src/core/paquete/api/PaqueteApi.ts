import { sttpClient } from 'shared/api';
import { Paquete } from '../models';
import { PaqueteRequest } from '../requests';

export class PaqueteApi {
  private static _api = sttpClient;
  private static _endpoint = '/paquetes';

  static async fetchAll() {
    return await PaqueteApi._api.get<Paquete[]>(PaqueteApi._endpoint);
  }

  static async fetchOne(id: number) {
    return await PaqueteApi._api.get<Paquete>(`${PaqueteApi._endpoint}/${id}`);
  }

  static async create(data: PaqueteRequest) {
    return await PaqueteApi._api.post<void>(PaqueteApi._endpoint, data);
  }

  static async destroy(id: number) {
    return await PaqueteApi._api.delete(`${PaqueteApi._endpoint}/${id}`);
  }

  static async update(data: PaqueteRequest, id: number) {
    return await PaqueteApi._api.patch(`${PaqueteApi._endpoint}/${id}`, data);
  }
}
