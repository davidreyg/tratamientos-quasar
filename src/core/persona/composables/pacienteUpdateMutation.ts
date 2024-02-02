import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { PersonaRequest } from '../requests';
import { UpdatePacienteTask } from '../tasks';

export function usePacienteUpdateMutation() {
  return useMutation<
    unknown,
    ApiatoError<PersonaRequest>,
    { data: PersonaRequest; id: string },
    unknown
  >(({ data, id }) => UpdatePacienteTask.run(data, id));
}
