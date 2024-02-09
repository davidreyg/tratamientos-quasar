import { sttpClient } from 'shared/api';
import { Query } from 'shared/utils';
import { Paciente } from '../models';
import { PacienteRequest } from '../requests';
export class PacienteApi {
  private static _api = sttpClient;
  private static _endpoint = '/pacientes';

  static fetchAll(query?: Query) {
    return PacienteApi._api.get<Paciente[]>(`${PacienteApi._endpoint}`, query);
  }

  static async create(data: PacienteRequest): Promise<void> {
    await PacienteApi._api.post(`${PacienteApi._endpoint}`, data);
  }

  static async update(data: PacienteRequest, id: string): Promise<void> {
    await PacienteApi._api.patch(`${PacienteApi._endpoint}/${id}`, data);
  }
}
