import { useMutation } from 'vue-query';
import { UnidadApi } from '../api';

export function useUnidadDeleteMutation() {
  return useMutation<unknown, void, number, unknown>((id) =>
    UnidadApi.destroy(id)
  );
}
