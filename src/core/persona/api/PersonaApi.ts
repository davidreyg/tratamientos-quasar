import { sttpClient } from 'shared/api';
import { Persona } from '../models';
import { PersonaRequest } from '../requests';

export class PersonaApi {
  private static _api = sttpClient;
  private static _endpoint = '/pacientes';

  static fetchByNumeroDocumento(numero_documento: string) {
    return PersonaApi._api.get<Persona[]>(`${PersonaApi._endpoint}`, {
      search: `numero_documento:${numero_documento}`,
      searchJoin: 'and',
    });
  }

  static fetchMedicos() {
    return PersonaApi._api.get<Persona[]>('/medicos');
  }

  static async create(data: PersonaRequest): Promise<void> {
    await PersonaApi._api.post('/personas', data);
  }

  static async update(data: PersonaRequest, id: string): Promise<void> {
    await PersonaApi._api.patch(`/personas/${id}`, data);
  }
}
