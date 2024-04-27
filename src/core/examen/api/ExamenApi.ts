import { sttpClient } from 'shared/api';
import { Examen } from '../models';

export class ExamenApi {
  private static _api = sttpClient;
  private static _endpoint = '/examens';

  static async fetchAll(query?: object) {
    return await ExamenApi._api.get<Examen[]>(ExamenApi._endpoint, query);
  }

  static async fetchOne(id: number) {
    return await ExamenApi._api.get<Examen>(`${ExamenApi._endpoint}/${id}`);
  }

  static async create(data: unknown) {
    return await ExamenApi._api.post<void>(ExamenApi._endpoint, data);
  }

  static async destroy(id: number) {
    return await ExamenApi._api.delete(`${ExamenApi._endpoint}/${id}`);
  }

  static async update(data: unknown, id: number) {
    return await ExamenApi._api.patch(`${ExamenApi._endpoint}/${id}`, data);
  }
}
