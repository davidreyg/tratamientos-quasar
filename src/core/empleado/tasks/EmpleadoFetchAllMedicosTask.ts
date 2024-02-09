import { NotifyUtils } from 'shared/utils';
import { EmpleadoApi } from '../api';
import { Empleado } from '../models';

export class EmpleadoFetchAllMedicosTask {
  static async run(): Promise<Empleado[]> {
    try {
      const response = await EmpleadoApi.fetchAll({
        search: 'cargo_id:1',
        limit: 0,
      });

      return response.data().data;
    } catch (error) {
      NotifyUtils.error('Hubo un error al traer los medicos...');
      throw error;
    }
  }
}
