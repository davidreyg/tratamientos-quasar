import { sttpClient } from 'shared/api';
import { Examen } from '../models';

export class ExamenApi {
  private static _api = sttpClient;
  private static _endpoint = '/examens';

  static async fetchAll(query?: object) {
    return await ExamenApi._api.get<Examen[]>(ExamenApi._endpoint, query);
  }
}
