import { sttpClient } from 'shared/api';
import { Query } from 'shared/utils';
import { Establecimiento } from '../models';
import { EstablecimientoRequest } from '../requests';
export class EstablecimientoApi {
  private static _api = sttpClient;
  private static _endpoint = '/establecimientos';

  static fetchAll(query?: Query) {
    return EstablecimientoApi._api.get<Establecimiento[]>(
      `${EstablecimientoApi._endpoint}`,
      query
    );
  }

  static async fetchOne(id: number) {
    return await EstablecimientoApi._api.get<Establecimiento>(
      `${EstablecimientoApi._endpoint}/${id}`
    );
  }

  static async create(data: EstablecimientoRequest) {
    return await EstablecimientoApi._api.post<void>(
      EstablecimientoApi._endpoint,
      data
    );
  }

  static async destroy(id: number) {
    return await EstablecimientoApi._api.delete(
      `${EstablecimientoApi._endpoint}/${id}`
    );
  }

  static async update(data: EstablecimientoRequest, id: number) {
    return await EstablecimientoApi._api.patch(
      `${EstablecimientoApi._endpoint}/${id}`,
      data
    );
  }
}
