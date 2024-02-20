import { sttpClient } from 'shared/api';
import { Triaje } from '../models';

export class TriajeApi {
  private static _api = sttpClient;
  private static _endpoint = '/signos';

  static async fetchAll(query?: object) {
    return await TriajeApi._api.get<Triaje[]>(TriajeApi._endpoint, query);
  }
}
