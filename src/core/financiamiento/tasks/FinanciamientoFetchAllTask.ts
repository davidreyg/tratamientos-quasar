import { NotifyUtils } from 'shared/utils';
import { FinanciamientoApi } from '../api';
import { Financiamiento } from '../models';

export class FinanciamientoFetchAllTask {
  static async run(): Promise<Financiamiento[]> {
    try {
      const response = await FinanciamientoApi.fetchAll();

      return response.data().data;
    } catch (error) {
      NotifyUtils.error('Hubo un error al traer los financiamientos...');
      throw error;
    }
  }
}
