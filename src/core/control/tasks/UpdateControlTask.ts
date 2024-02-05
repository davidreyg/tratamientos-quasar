import { ControlApi } from '../api';
import { ControlCreateRequest } from '../requests';

export class UpdateControlTask {
  static async run(
    data: ControlCreateRequest,
    control_id: string
  ): Promise<void> {
    try {
      await ControlApi.update(data, control_id);
    } catch (error) {
      throw error;
    }
  }
}
