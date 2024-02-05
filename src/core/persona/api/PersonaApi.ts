import Sttp from '@supercharge/sttp';
import { sttpClient } from 'shared/api';
import { Persona } from '../models';
import { Reniec } from '../models/Reniec';
import { PersonaRequest } from '../requests';

export class PersonaApi {
  private static _api = sttpClient;
  private static _endpoint = '/pacientes';

  static fetchByNumeroDocumento(numero_documento: number) {
    return PersonaApi._api.get<Persona[]>(`${PersonaApi._endpoint}`, {
      search: `numero_documento:${numero_documento}`,
      searchJoin: 'and',
    });
  }

  static fetchReniecByDNI(numero_documento: number) {
    return Sttp.withHeaders({
      Authorization: 'token eed63ab26117dacf4986f37ca1e61c4ccafc2aea',
    }).get<Reniec>(`${process.env.RENIEC_URL}/${numero_documento}`, {});
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
