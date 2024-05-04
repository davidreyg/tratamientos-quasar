import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { UnidadApi } from '../api';
import { UnidadRequest } from '../requests';

export function useUnidadUpdateMutation() {
  return useMutation<
    unknown,
    ApiatoError<UnidadRequest>,
    { data: UnidadRequest; id: number },
    unknown
  >(({ data, id }) => UnidadApi.update(data, id));
}
