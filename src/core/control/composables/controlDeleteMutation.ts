import { useMutation } from 'vue-query';
import { DeleteControlTask } from '../tasks';

export function useControlDeleteMutation() {
  return useMutation<unknown, unknown, string, unknown>((id) =>
    DeleteControlTask.run(id)
  );
}
