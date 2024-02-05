import { useMutation } from 'vue-query';
import { FinalizarDiagnosticoTask } from '../tasks';

export function useDiagnosticoFinalizarMutation() {
  return useMutation<unknown, unknown, string, unknown>((data) =>
    FinalizarDiagnosticoTask.run(data)
  );
}
