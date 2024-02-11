import { sttpClient } from 'shared/api';
import { Query } from 'shared/utils';
import { Empleado } from '../models';
import { EmpleadoRequest } from '../requests';
export class EmpleadoApi {
  private static _api = sttpClient;
  private static _endpoint = '/empleados';

  static fetchAll(query?: Query) {
    return EmpleadoApi._api.get<Empleado[]>(`${EmpleadoApi._endpoint}`, query);
  }

  static async create(data: EmpleadoRequest): Promise<void> {
    await EmpleadoApi._api.post(`${EmpleadoApi._endpoint}`, data);
  }

  static async update(data: EmpleadoRequest, id: number): Promise<void> {
    await EmpleadoApi._api.patch(`${EmpleadoApi._endpoint}/${id}`, data);
  }

  static async delete(id: number): Promise<void> {
    await EmpleadoApi._api.delete(`${EmpleadoApi._endpoint}/${id}`);
  }

  static async fetchById(id: number) {
    return await EmpleadoApi._api.get<Empleado>(
      `${EmpleadoApi._endpoint}/${id}`
    );
  }
}
