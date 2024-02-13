import { useMutation } from 'vue-query';
import { DiagnosticoApi } from '../api';

export function useDiagnosticoDeleteMutation() {
  return useMutation<unknown, void, number, unknown>((id) =>
    DiagnosticoApi.delete(id)
  );
}
