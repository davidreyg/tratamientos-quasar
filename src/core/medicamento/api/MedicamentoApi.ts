import { sttpClient } from 'shared/api';
import { Medicamento } from '../models';

export class MedicamentoApi {
  private static _api = sttpClient;
  private static _endpoint = '/medicamentos';

  static fetchAll() {
    return MedicamentoApi._api.get<Medicamento[]>(
      `${MedicamentoApi._endpoint}`
    );
  }
}
