import { sttpClient } from 'shared/api';
import { Query } from 'shared/utils';
import { Orden } from '../models';
import { OrdenCreateRequest } from '../requests';
export class OrdenApi {
  private static _api = sttpClient;
  private static _endpoint = '/ordens';

  static fetchAll(query?: Query) {
    return OrdenApi._api.get<Orden[]>(`${OrdenApi._endpoint}`, query);
  }
  static fetchById(id: number) {
    return OrdenApi._api.get<Orden>(`${OrdenApi._endpoint}/${id}`);
  }

  static async create(data: OrdenCreateRequest) {
    await OrdenApi._api.post(OrdenApi._endpoint, data);
  }
}
