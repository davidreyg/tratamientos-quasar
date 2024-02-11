import { Privilegio } from 'core/privilegio';
import { sttpClient } from 'shared/api';

export class PrivilegioApi {
  private static _api = sttpClient;
  private static _endpoint = '/privilegios';

  static async fetchAll(query?: object) {
    return await PrivilegioApi._api.get<Privilegio[]>(
      PrivilegioApi._endpoint,
      query
    );
  }
}
