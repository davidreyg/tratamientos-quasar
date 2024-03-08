import { PaqueteApi } from '../api';
import { PaqueteRequest } from '../requests';

export class PaqueteUpdateTask {
  static async run(data: PaqueteRequest, id: number): Promise<void> {
    try {
      await PaqueteApi.update(data, id);
    } catch (error) {
      throw error;
    }
  }
}
