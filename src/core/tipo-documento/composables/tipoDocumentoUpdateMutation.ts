import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { TipoDocumentoRequest } from '../requests';
import { TipoDocumentoUpdateTask } from '../tasks';

export function useTipoDocumentoUpdateMutation() {
  return useMutation<
    unknown,
    ApiatoError<TipoDocumentoRequest>,
    { data: TipoDocumentoRequest; id: number },
    unknown
  >(({ data, id }) => TipoDocumentoUpdateTask.run(data, id));
}
