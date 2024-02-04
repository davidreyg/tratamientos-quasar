import { NotifyUtils } from 'shared/utils';
import { ComplicacionApi } from '../api';
import { Complicacion } from '../models';

export class ComplicacionFetchAllTask {
  static async run(): Promise<Complicacion[]> {
    try {
      const response = await ComplicacionApi.fetchAll();

      return response.data().data;
    } catch (error) {
      NotifyUtils.error('Hubo un error al traer las complicaciones...');
      throw error;
    }
  }
}
