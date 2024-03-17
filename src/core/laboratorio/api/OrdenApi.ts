import { sttpClient } from 'shared/api';
import { Query } from 'shared/utils';
import { Orden } from '../models';
import { OrdenCreateRequest, OrdenResultadosRequest } from '../requests';
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

  static async updateExamens(id: number, data: OrdenResultadosRequest) {
    await OrdenApi._api.patch(`${OrdenApi._endpoint}/${id}/examens`, data);
  }

  static async registrar(id: number) {
    await OrdenApi._api.patch(`${OrdenApi._endpoint}/${id}/registrar`);
  }
}
