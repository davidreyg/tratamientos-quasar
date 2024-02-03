import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { DiagnosticoCreateRequest } from '../requests';
import { CreateDiagnosticoTask } from '../tasks';

export function useDiagnosticoCreateMutation() {
  return useMutation<
    unknown,
    ApiatoError<DiagnosticoCreateRequest>,
    DiagnosticoCreateRequest,
    unknown
  >((data) => CreateDiagnosticoTask.run(data));
}
