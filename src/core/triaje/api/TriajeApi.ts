import { sttpClient } from 'shared/api';
import { Triaje } from '../models';
import { TriajeCreateRequest } from '../requests';

export class TriajeApi {
  private static _api = sttpClient;
  private static _endpoint = '/triajes';

  static async fetchAll(query?: object) {
    return await TriajeApi._api.get<Triaje[]>(TriajeApi._endpoint, query);
  }

  static async create(data: TriajeCreateRequest) {
    return await TriajeApi._api.post<void>(TriajeApi._endpoint, data);
  }
  static async delete(id: number) {
    await TriajeApi._api.delete<void>(`${TriajeApi._endpoint}/${id}`);
  }
}
