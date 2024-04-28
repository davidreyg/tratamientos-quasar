import { sttpClient } from 'shared/api';
import { Respuesta } from '../models';

export class RespuestaApi {
  private static _api = sttpClient;
  private static _endpoint = '/respuestas';

  static async fetchAll(query?: object) {
    return await RespuestaApi._api.get<Respuesta[]>(RespuestaApi._endpoint, {
      limit: 0,
      ...query,
    });
  }
}
