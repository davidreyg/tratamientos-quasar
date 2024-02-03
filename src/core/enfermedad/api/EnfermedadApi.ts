import { sttpClient } from 'shared/api';
import { Enfermedad } from '../models';

export class EnfermedadApi {
  private static _api = sttpClient;
  private static _endpoint = '/enfermedades';

  static fetchAll() {
    return EnfermedadApi._api.get<Enfermedad[]>(`${EnfermedadApi._endpoint}`);
  }
}
