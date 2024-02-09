import { useMutation } from 'vue-query';
import { TipoDocumentoDeleteTask } from '../tasks';

export function useTipoDocumentoDeleteMutation() {
  return useMutation<unknown, void, number, unknown>((id) =>
    TipoDocumentoDeleteTask.run(id)
  );
}
