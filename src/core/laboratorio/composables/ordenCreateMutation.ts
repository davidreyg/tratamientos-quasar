import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { OrdenApi } from '../api';
import { OrdenCreateRequest } from '../requests';

export function useOrdenCreateMutation() {
  return useMutation<
    unknown,
    ApiatoError<OrdenCreateRequest>,
    OrdenCreateRequest,
    unknown
  >((data) => OrdenApi.create(data));
}
