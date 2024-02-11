import { Privilegio } from 'core/privilegio';
import { RoleApi } from '../api';

export class RoleFetchPrivilegiosTask {
  static async run(id: number): Promise<Privilegio[]> {
    try {
      const response = await RoleApi.fetchRolePrivilegios(id);

      return response.data().data;
    } catch (error) {
      throw error;
    }
  }
}
