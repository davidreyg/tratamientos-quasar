import { PaqueteApi } from '../api';

export class PaqueteDeleteTask {
  static async run(id: number): Promise<void> {
    try {
      await PaqueteApi.destroy(id);
    } catch (error) {
      throw error;
    }
  }
}
