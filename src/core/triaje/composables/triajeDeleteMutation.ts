import { useMutation } from 'vue-query';
import { TriajeApi } from '../api';

export function useTriajeDeleteMutation() {
  return useMutation<unknown, void, number, unknown>((id) =>
    TriajeApi.delete(id)
  );
}
