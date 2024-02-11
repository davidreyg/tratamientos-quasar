import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { EmpleadoRequest } from '../requests';
import { EmpleadoCreateTask } from '../tasks';

export function useEmpleadoCreateMutation() {
  return useMutation<
    unknown,
    ApiatoError<EmpleadoRequest>,
    EmpleadoRequest,
    unknown
  >((data) => EmpleadoCreateTask.run(data));
}
