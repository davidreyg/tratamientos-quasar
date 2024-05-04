import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { SeccionApi } from '../api';
import { SeccionRequest } from '../requests';

export function useSeccionCreateMutation() {
  return useMutation<
    unknown,
    ApiatoError<SeccionRequest>,
    SeccionRequest,
    unknown
  >((data) => SeccionApi.create(data));
}
