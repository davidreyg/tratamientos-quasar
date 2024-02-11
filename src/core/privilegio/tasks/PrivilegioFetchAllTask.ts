import { PrivilegioApi } from '../api';
import { Privilegio } from '../models';

export class PrivilegioFetchAllTask {
  static async run(query?: { include?: string }): Promise<Privilegio[]> {
    try {
      const response = await PrivilegioApi.fetchAll(query);

      return response.data().data;
    } catch (error) {
      throw error;
    }
  }
}
