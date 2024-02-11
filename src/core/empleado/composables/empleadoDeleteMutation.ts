import { useMutation } from 'vue-query';
import { EmpleadoDeleteTask } from '../tasks';

export function useEmpleadoDeleteMutation() {
  return useMutation<unknown, void, number, unknown>((id) =>
    EmpleadoDeleteTask.run(id)
  );
}
