import { sttpClient } from 'shared/api';
import { Categoria } from '../models';
import { CategoriaRequest } from '../requests';

export class CategoriaApi {
  private static _api = sttpClient;
  private static _endpoint = '/categorias';

  static async fetchAll(query?: object) {
    return await CategoriaApi._api.get<Categoria[]>(CategoriaApi._endpoint, {
      limit: 0,
      ...query,
    });
  }

  static async fetchOne(id: number) {
    return await CategoriaApi._api.get<Categoria>(
      `${CategoriaApi._endpoint}/${id}`
    );
  }

  static async create(data: CategoriaRequest) {
    return await CategoriaApi._api.post<void>(CategoriaApi._endpoint, data);
  }

  static async update(data: CategoriaRequest, id: number) {
    return await CategoriaApi._api.patch(
      `${CategoriaApi._endpoint}/${id}`,
      data
    );
  }

  static async destroy(id: number) {
    return await CategoriaApi._api.delete(`${CategoriaApi._endpoint}/${id}`);
  }
}
