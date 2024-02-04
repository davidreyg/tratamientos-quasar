import { ControlApi } from '../api';
import { ControlCreateRequest } from '../requests';

export class CreateControlTask {
  static async run(data: ControlCreateRequest): Promise<void> {
    try {
      await ControlApi.create(data);
    } catch (error) {
      throw error;
    }
  }
}
