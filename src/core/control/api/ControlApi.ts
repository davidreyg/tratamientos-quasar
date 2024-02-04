import { sttpClient } from 'shared/api';
import { Control } from '../models';
import { ControlCreateRequest } from '../requests';

export class ControlApi {
  private static _api = sttpClient;
  private static _endpoint = 'controls';

  static async create(data: ControlCreateRequest) {
    await ControlApi._api.post(ControlApi._endpoint, data);
  }

  static async fetchControlesByDiagnostico(diagnostico_id: string) {
    return await ControlApi._api.get<Control[]>(ControlApi._endpoint, {
      search: `diagnostico_id:${diagnostico_id}`,
    });
  }

  static async fetchControlById(id: string) {
    return await ControlApi._api.get<Control>(`${ControlApi._endpoint}/${id}`);
  }
}
