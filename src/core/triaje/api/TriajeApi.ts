import { sttpClient } from 'shared/api';
import { Query } from 'shared/utils';
import { Triaje } from '../models';
import { TriajeCreateRequest } from '../requests';

export class TriajeApi {
  private static _api = sttpClient;
  private static _endpoint = '/triajes';

  static async fetchAll(query?: Query) {
    return await TriajeApi._api.get<Triaje[]>(TriajeApi._endpoint, query);
  }

  static async create(data: TriajeCreateRequest) {
    return await TriajeApi._api.post<void>(TriajeApi._endpoint, data);
  }

  static async findById(id: number) {
    return await TriajeApi._api.get<Triaje>(`${TriajeApi._endpoint}/${id}`);
  }
  static async update(data: TriajeCreateRequest, id: number) {
    await TriajeApi._api.patch<void>(`${TriajeApi._endpoint}/${id}`, data);
  }

  static async delete(id: number) {
    await TriajeApi._api.delete<void>(`${TriajeApi._endpoint}/${id}`);
  }
}
