import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { TriajeApi } from '../api';
import { TriajeCreateRequest } from '../requests';

export function useTriajeUpdateMutation() {
  return useMutation<
    unknown,
    ApiatoError<TriajeCreateRequest>,
    { data: TriajeCreateRequest; id: number },
    unknown
  >(({ data, id }) => TriajeApi.update(data, id));
}
