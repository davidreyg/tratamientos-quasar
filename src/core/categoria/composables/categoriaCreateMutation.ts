import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { CategoriaApi } from '../api';
import { CategoriaRequest } from '../requests';

export function useCategoriaCreateMutation() {
  return useMutation<
    unknown,
    ApiatoError<CategoriaRequest>,
    CategoriaRequest,
    unknown
  >((data) => CategoriaApi.create(data));
}
