import { useMutation } from 'vue-query';
import { ExamenApi } from '../api';

export function useExamenDeleteMutation() {
  return useMutation<unknown, void, number, unknown>((id) =>
    ExamenApi.destroy(id)
  );
}
