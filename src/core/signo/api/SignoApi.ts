import { sttpClient } from 'shared/api';
import { Signo } from '../models';

export class SignoApi {
  private static _api = sttpClient;
  private static _endpoint = '/signos';

  static async fetchAll(query?: object) {
    return await SignoApi._api.get<Signo[]>(SignoApi._endpoint, query);
  }
}
