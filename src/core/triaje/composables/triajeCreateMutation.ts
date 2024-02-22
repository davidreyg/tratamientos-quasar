import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { TriajeApi } from '../api';
import { TriajeCreateRequest } from '../requests';

export function useTriajeCreateMutation() {
  return useMutation<
    unknown,
    ApiatoError<TriajeCreateRequest>,
    TriajeCreateRequest,
    unknown
  >((data) => TriajeApi.create(data));
}
