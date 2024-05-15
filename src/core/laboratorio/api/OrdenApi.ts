import { Examen } from 'core/examen';
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

  static fetchResultadosPDF(id: number) {
    return OrdenApi._api
      .withOptions({ responseType: 'blob' })
      .get<BlobPart>(`${OrdenApi._endpoint}/${id}/resultados-pdf`);
  }

  static fetchOrdenPDF(id: number) {
    return OrdenApi._api
      .withOptions({ responseType: 'blob' })
      .get<BlobPart>(`${OrdenApi._endpoint}/${id}/orden-pdf`);
  }

  static async create(data: OrdenCreateRequest) {
    await OrdenApi._api.post(OrdenApi._endpoint, data);
  }

  static async updateExamens(id: number, data: OrdenResultadosRequest) {
    await OrdenApi._api.patch(`${OrdenApi._endpoint}/${id}/examens`, data);
  }

  static async update(id: number, data: OrdenCreateRequest) {
    await OrdenApi._api.patch(`${OrdenApi._endpoint}/${id}`, data);
  }

  static async destroy(id: number) {
    await OrdenApi._api.delete(`${OrdenApi._endpoint}/${id}`);
  }

  static async registrar(id: number) {
    await OrdenApi._api.patch(`${OrdenApi._endpoint}/${id}/registrar`);
  }

  static async verificar(id: number) {
    await OrdenApi._api.patch(`${OrdenApi._endpoint}/${id}/verificar`);
  }

  static async getConteoExamens(query?: Query) {
    return await OrdenApi._api.get<Examen[]>('reportes/conteo-examens', query);
  }

  static async exportConteoExamens() {
    return await OrdenApi._api
      .withOptions({ responseType: 'blob' })
      .post<Blob>('excel/conteo-examens');
  }
}
