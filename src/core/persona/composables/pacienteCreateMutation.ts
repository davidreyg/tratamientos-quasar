import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { PersonaRequest } from '../requests';
import { CreatePacienteTask } from '../tasks';

export function usePacienteCreateMutation() {
  return useMutation<
    unknown,
    ApiatoError<PersonaRequest>,
    PersonaRequest,
    unknown
  >((data) => CreatePacienteTask.run(data));
}
