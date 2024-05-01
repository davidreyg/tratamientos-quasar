import { sttpClient } from 'shared/api';
import { Item } from '../models';
import { ItemRequest } from '../requests';

export class ItemApi {
  private static _api = sttpClient;
  private static _endpoint = '/items';

  static async fetchAll(query?: object) {
    return await ItemApi._api.get<Item[]>(ItemApi._endpoint, {
      include: 'examen',
      ...query,
    });
  }

  static async fetchOne(id: number) {
    return await ItemApi._api.get<Item>(`${ItemApi._endpoint}/${id}`);
  }

  static async create(data: ItemRequest) {
    return await ItemApi._api.post<void>(ItemApi._endpoint, data);
  }

  static async destroy(id: number) {
    return await ItemApi._api.delete(`${ItemApi._endpoint}/${id}`);
  }

  static async update(data: ItemRequest, id: number) {
    return await ItemApi._api.patch(`${ItemApi._endpoint}/${id}`, data);
  }
}
