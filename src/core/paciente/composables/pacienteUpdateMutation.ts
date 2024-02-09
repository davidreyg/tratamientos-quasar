import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { PacienteRequest } from '../requests';
import { PacienteUpdateTask } from '../tasks';

export function usePacienteUpdateMutation() {
  return useMutation<
    unknown,
    ApiatoError<PacienteRequest>,
    { data: PacienteRequest; id: string },
    unknown
  >(({ data, id }) => PacienteUpdateTask.run(data, id));
}
