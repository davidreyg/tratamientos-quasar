import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { SeccionApi } from '../api';
import { SeccionRequest } from '../requests';

export function useSeccionUpdateMutation() {
  return useMutation<
    unknown,
    ApiatoError<SeccionRequest>,
    { data: SeccionRequest; id: number },
    unknown
  >(({ data, id }) => SeccionApi.update(data, id));
}
