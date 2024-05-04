import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { UnidadApi } from '../api';
import { UnidadRequest } from '../requests';

export function useUnidadCreateMutation() {
  return useMutation<
    unknown,
    ApiatoError<UnidadRequest>,
    UnidadRequest,
    unknown
  >((data) => UnidadApi.create(data));
}
