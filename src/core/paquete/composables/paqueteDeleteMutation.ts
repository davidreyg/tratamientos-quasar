import { useMutation } from 'vue-query';
import { PaqueteDeleteTask } from '../tasks';

export function usePaqueteDeleteMutation() {
  return useMutation<unknown, void, number, unknown>((id) =>
    PaqueteDeleteTask.run(id)
  );
}
