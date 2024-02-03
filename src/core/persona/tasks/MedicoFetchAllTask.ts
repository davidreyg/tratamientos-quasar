import { NotifyUtils } from 'shared/utils';
import { PersonaApi } from '../api';
import { Persona } from '../models';

export class MedicoFetchAllTask {
  static async run(): Promise<Persona[]> {
    try {
      const response = await PersonaApi.fetchMedicos();

      return response.data().data;
    } catch (error) {
      NotifyUtils.error('Hubo un error al traer los medicos...');
      throw error;
    }
  }
}
