import { Privilegio } from 'core/privilegio';
import { sttpClient } from 'shared/api';
import { Role } from '../models';
import { CreateRoleRequest } from '../requests';

export class RoleApi {
  private static _api = sttpClient;
  private static _endpoint = '/roles';

  static async fetchAll(query?: object) {
    return await RoleApi._api.get<Role[]>(RoleApi._endpoint, query);
  }

  static async fetchRolePrivilegios(id: number) {
    return await RoleApi._api.get<Privilegio[]>(
      `${RoleApi._endpoint}/${id}/privilegios`
    );
  }

  static async store(data: CreateRoleRequest) {
    return await RoleApi._api.post(RoleApi._endpoint, data);
  }
  static async destroy(roleId: string) {
    return await RoleApi._api.delete(`${RoleApi._endpoint}/${roleId}`);
  }
}
