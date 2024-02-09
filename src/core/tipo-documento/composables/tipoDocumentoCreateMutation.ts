import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { TipoDocumentoRequest } from '../requests';
import { TipoDocumentoCreateTask } from '../tasks';

export function useTipoDocumentoCreateMutation() {
  return useMutation<
    unknown,
    ApiatoError<TipoDocumentoRequest>,
    TipoDocumentoRequest,
    unknown
  >((data) => TipoDocumentoCreateTask.run(data));
}
