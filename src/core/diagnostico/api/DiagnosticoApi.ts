import { sttpClient } from 'shared/api';
import { Diagnostico } from '../models';
import { DiagnosticoCreateRequest } from '../requests';

export class DiagnosticoApi {
  private static _api = sttpClient;
  private static _endpoint = 'diagnosticos';

  static async create(data: DiagnosticoCreateRequest) {
    await DiagnosticoApi._api.post(DiagnosticoApi._endpoint, data);
  }

  static async fetchDiagnosticosByPaciente(paciente_id: string) {
    return await DiagnosticoApi._api.get<Diagnostico[]>(
      DiagnosticoApi._endpoint,
      {
        search: `paciente_id:${paciente_id}`,
      }
    );
  }

  static async fetchDiagnosticoById(id: string) {
    return await DiagnosticoApi._api.get<Diagnostico>(
      `${DiagnosticoApi._endpoint}/${id}`
    );
  }
}
