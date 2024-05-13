import { useMutation } from 'vue-query';
import { OrdenApi } from '../api';

export function useOrdenDeleteMutation() {
  return useMutation<unknown, void, number, unknown>((id) =>
    OrdenApi.destroy(id)
  );
}
