import { PaqueteApi } from '../api';
import { Paquete } from '../models';

export class PaqueteFetchByIdTask {
  static async run(id: number): Promise<Paquete> {
    try {
      return (await PaqueteApi.fetchOne(id)).data().data;
    } catch (error) {
      throw error;
    }
  }
}
