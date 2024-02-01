import { NotifyUtils } from 'shared/utils';
import { RoleApi } from '../api';
import { Role } from '../models';

export class FetchAllRolesTask {
  static async run(query: { include?: string }): Promise<Role[]> {
    try {
      const response = await RoleApi.fetchAll(query);

      return response.data().data;
    } catch (error) {
      NotifyUtils.error('Hubo un error al traer los roles...');
      throw error;
    }
  }
}
