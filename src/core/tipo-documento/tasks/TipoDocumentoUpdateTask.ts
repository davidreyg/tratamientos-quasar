import { TipoDocumentoApi } from '../api';
import { TipoDocumentoRequest } from '../requests';

export class TipoDocumentoUpdateTask {
  static async run(data: TipoDocumentoRequest, id: number): Promise<void> {
    try {
      await TipoDocumentoApi.update(data, id);
    } catch (error) {
      throw error;
    }
  }
}
