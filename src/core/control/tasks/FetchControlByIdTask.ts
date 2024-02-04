import { ControlApi } from '../api';
import { Control } from '../models';

export class FetchControlByIdTask {
  static async run(id: string): Promise<Control> {
    try {
      const response = await ControlApi.fetchControlById(id);
      return response.data().data;
    } catch (error) {
      throw error;
    }
  }
}
