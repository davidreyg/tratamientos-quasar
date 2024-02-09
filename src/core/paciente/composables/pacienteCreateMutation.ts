import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { PacienteRequest } from '../requests';
import { PacienteCreateTask } from '../tasks';

export function usePacienteCreateMutation() {
  return useMutation<
    unknown,
    ApiatoError<PacienteRequest>,
    PacienteRequest,
    unknown
  >((data) => PacienteCreateTask.run(data));
}
