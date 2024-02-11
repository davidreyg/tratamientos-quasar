import { sttpClient } from 'shared/api';
import { Query } from 'shared/utils';
import { Cargo } from '../models';
export class CargoApi {
  private static _api = sttpClient;
  private static _endpoint = '/cargos';

  static fetchAll(query?: Query) {
    return CargoApi._api.get<Cargo[]>(`${CargoApi._endpoint}`, query);
  }
}
