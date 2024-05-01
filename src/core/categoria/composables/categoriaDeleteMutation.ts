import { useMutation } from 'vue-query';
import { CategoriaApi } from '../api';

export function useCategoriaDeleteMutation() {
  return useMutation<unknown, void, number, unknown>((id) =>
    CategoriaApi.destroy(id)
  );
}
