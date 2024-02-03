import { sttpClient } from 'shared/api';
import { Financiamiento } from '../models';

export class FinanciamientoApi {
  private static _api = sttpClient;
  private static _endpoint = '/financiamientos';

  static fetchAll() {
    return FinanciamientoApi._api.get<Financiamiento[]>(
      `${FinanciamientoApi._endpoint}`
    );
  }
}
