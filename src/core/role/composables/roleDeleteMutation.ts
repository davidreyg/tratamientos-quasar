import { useMutation } from 'vue-query';
import { DeleteRoleTask } from '../tasks';

export function useRoleDeleteMutation() {
  return useMutation<unknown, unknown, string, unknown>((data) =>
    DeleteRoleTask.run(data)
  );
}
