import { PaqueteApi } from '../api';
import { PaqueteRequest } from '../requests';

export class PaqueteCreateTask {
  static async run(data: PaqueteRequest): Promise<void> {
    try {
      await PaqueteApi.create(data);
    } catch (error) {
      throw error;
    }
  }
}
