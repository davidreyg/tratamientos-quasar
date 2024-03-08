import { PaqueteApi } from '../api';
import { Paquete } from '../models';

export class PaqueteFetchAllTask {
  static async run(): Promise<Paquete[]> {
    try {
      const response = await PaqueteApi.fetchAll();

      return response.data().data;
    } catch (error) {
      throw error;
    }
  }
}
