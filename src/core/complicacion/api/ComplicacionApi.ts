import { sttpClient } from 'shared/api';
import { Complicacion } from '../models';

export class ComplicacionApi {
  private static _api = sttpClient;
  private static _endpoint = '/complicaciones';

  static fetchAll() {
    return ComplicacionApi._api.get<Complicacion[]>(
      `${ComplicacionApi._endpoint}`
    );
  }
}
