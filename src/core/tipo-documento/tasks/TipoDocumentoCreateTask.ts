import { TipoDocumentoApi } from '../api';
import { TipoDocumentoRequest } from '../requests';

export class TipoDocumentoCreateTask {
  static async run(data: TipoDocumentoRequest): Promise<void> {
    try {
      await TipoDocumentoApi.create(data);
    } catch (error) {
      throw error;
    }
  }
}
