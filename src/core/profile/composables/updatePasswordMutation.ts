import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { UpdatePasswordRequest } from '../requests';
import { UpdateUserDataTask } from '../tasks';

export function useUpdatePasswordMutation() {
  return useMutation<
    unknown,
    ApiatoError<UpdatePasswordRequest>,
    UpdatePasswordRequest,
    unknown
  >((data) => UpdateUserDataTask.run(data));
}
