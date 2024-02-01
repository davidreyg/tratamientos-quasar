import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { CreateRoleRequest } from '../requests';
import { CreateRoleTask } from '../tasks';

export function useRoleCreateMutation() {
  return useMutation<
    unknown,
    ApiatoError<CreateRoleRequest>,
    CreateRoleRequest,
    unknown
  >((data) => CreateRoleTask.run(data));
}
