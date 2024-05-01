import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { CategoriaApi } from '../api';
import { CategoriaRequest } from '../requests';

export function useCategoriaUpdateMutation() {
  return useMutation<
    unknown,
    ApiatoError<CategoriaRequest>,
    { data: CategoriaRequest; id: number },
    unknown
  >(({ data, id }) => CategoriaApi.update(data, id));
}
