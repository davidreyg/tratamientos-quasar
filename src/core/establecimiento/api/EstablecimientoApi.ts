import { sttpClient } from 'shared/api';
import { Query } from 'shared/utils';
import { Establecimiento } from '../models';
export class EstablecimientoApi {
  private static _api = sttpClient;
  private static _endpoint = '/establecimientos';

  static fetchAll(query?: Query) {
    return EstablecimientoApi._api.get<Establecimiento[]>(
      `${EstablecimientoApi._endpoint}`,
      query
    );
  }
}
