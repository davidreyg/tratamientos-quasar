import { NotifyUtils } from 'shared/utils';
import { MedicamentoApi } from '../api';
import { Medicamento } from '../models';

export class MedicamentoFetchAllTask {
  static async run(): Promise<Medicamento[]> {
    try {
      const response = await MedicamentoApi.fetchAll();

      return response.data().data;
    } catch (error) {
      NotifyUtils.error('Hubo un error al traer los medicamentos...');
      throw error;
    }
  }
}
