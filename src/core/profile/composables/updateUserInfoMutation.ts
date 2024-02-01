import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { UpdateUserDataRequest } from '../requests';
import { UpdateUserDataTask } from '../tasks';

export function useUpdateUserInfoMutation() {
  return useMutation<
    unknown,
    ApiatoError<UpdateUserDataRequest>,
    UpdateUserDataRequest,
    unknown
  >((data) => UpdateUserDataTask.run(data));
}
