import { useMutation } from 'vue-query';
import { FinalizarDiagnosticoTask } from '../tasks';

export function useDiagnosticoFinalizarMutation() {
  return useMutation<unknown, unknown, { motivo: string; id: string }, unknown>(
    ({ motivo, id }) => FinalizarDiagnosticoTask.run(motivo, id)
  );
}
