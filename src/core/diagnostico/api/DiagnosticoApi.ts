import { sttpClient } from 'shared/api';
import { Query } from 'shared/utils';
import { Diagnostico } from '../models';
import { DiagnosticoCreateRequest } from '../requests';

export class DiagnosticoApi {
  private static _api = sttpClient;
  private static _endpoint = 'diagnosticos';

  static fetchAll(query?: Query) {
    return DiagnosticoApi._api.get<Diagnostico[]>(
      `${DiagnosticoApi._endpoint}`,
      query
    );
  }

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

  static async finalizarDiagnostico(motivo_finalizacion: string, id: string) {
    return await DiagnosticoApi._api.patch(
      `${DiagnosticoApi._endpoint}/${id}/finalizar`,
      { motivo_finalizacion }
    );
  }

  static async delete(id: number) {
    await DiagnosticoApi._api.delete(`${DiagnosticoApi._endpoint}/${id}`);
  }
}
