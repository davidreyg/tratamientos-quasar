import { ApiatoResponse, Query } from 'shared/utils';
import { EmpleadoApi } from '../api';
import { Empleado } from '../models';

export class EmpleadoFetchAllTask {
  static async run(query?: Query): Promise<ApiatoResponse<Empleado[]>> {
    try {
      const response = await EmpleadoApi.fetchAll({ fetchAll: true, ...query });

      return response.data();
    } catch (error) {
      throw error;
    }
  }
}
