import { sttpClient } from 'shared/api';
import { Categoria, Tipo } from '../models';

export class CategoriaApi {
  private static _api = sttpClient;
  private static _endpoint = '/categorias';

  static async fetchAll(query?: object) {
    return await CategoriaApi._api.get<Categoria[]>(CategoriaApi._endpoint, {
      limit: 0,
      ...query,
    });
  }

  static async fetchAllTipos() {
    return await CategoriaApi._api.get<Tipo>('tipos');
  }
}
