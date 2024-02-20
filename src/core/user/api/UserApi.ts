import { sttpClient } from 'shared/api';
import { Query } from 'shared/utils';
import { User } from '../models';
import { UserRequest, UserUpdateRequest } from '../requests';

export class UserApi {
  private static _api = sttpClient;
  private static _endpoint = '/users';

  static async fetchAll(query?: Query) {
    return await UserApi._api.get<User[]>(UserApi._endpoint, query);
  }

  static async fetchOne(id: number) {
    return await UserApi._api.get<User>(`${UserApi._endpoint}/${id}`);
  }

  static async create(data: UserRequest) {
    return await UserApi._api.post<void>(UserApi._endpoint, data);
  }

  static async destroy(id: number) {
    return await UserApi._api.delete(`${UserApi._endpoint}/${id}`);
  }

  static async update(data: UserUpdateRequest, id: number) {
    return await UserApi._api.patch(`${UserApi._endpoint}/${id}`, data);
  }
}
