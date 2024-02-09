import { TipoDocumentoApi } from '../api';

export class TipoDocumentoDeleteTask {
  static async run(id: number): Promise<void> {
    try {
      await TipoDocumentoApi.destroy(id);
    } catch (error) {
      throw error;
    }
  }
}
