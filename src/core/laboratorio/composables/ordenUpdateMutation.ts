import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { OrdenApi } from '../api';
import { OrdenCreateRequest } from '../requests';

export function useOrdenUpdateMutation() {
  return useMutation<
    unknown,
    ApiatoError<OrdenCreateRequest>,
    { id: number; data: OrdenCreateRequest },
    unknown
  >(({ id, data }) => OrdenApi.update(id, data));
}
