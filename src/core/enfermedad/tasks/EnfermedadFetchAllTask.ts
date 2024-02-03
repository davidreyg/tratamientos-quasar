import { NotifyUtils } from 'shared/utils';
import { EnfermedadApi } from '../api';
import { Enfermedad } from '../models';

export class EnfermedadFetchAllTask {
  static async run(): Promise<Enfermedad[]> {
    try {
      const response = await EnfermedadApi.fetchAll();

      return response.data().data;
    } catch (error) {
      NotifyUtils.error('Hubo un error al traer los Enfermedads...');
      throw error;
    }
  }
}
