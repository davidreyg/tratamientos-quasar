import { sttpClient } from 'shared/api';
import { Respuesta } from '../models';
import { RespuestaRequest } from '../requests';

export class RespuestaApi {
  private static _api = sttpClient;
  private static _endpoint = '/respuestas';

  static async fetchAll(query?: object) {
    return await RespuestaApi._api.get<Respuesta[]>(RespuestaApi._endpoint, {
      limit: 0,
      ...query,
    });
  }

  static async fetchOne(id: number) {
    return await RespuestaApi._api.get<Respuesta>(
      `${RespuestaApi._endpoint}/${id}`
    );
  }

  static async create(data: RespuestaRequest) {
    return await RespuestaApi._api.post<void>(RespuestaApi._endpoint, data);
  }

  static async destroy(id: number) {
    return await RespuestaApi._api.delete(`${RespuestaApi._endpoint}/${id}`);
  }

  static async update(data: RespuestaRequest, id: number) {
    return await RespuestaApi._api.patch(
      `${RespuestaApi._endpoint}/${id}`,
      data
    );
  }
}
