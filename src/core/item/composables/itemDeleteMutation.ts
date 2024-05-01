import { useMutation } from 'vue-query';
import { ItemApi } from '../api';

export function useItemDeleteMutation() {
  return useMutation<unknown, void, number, unknown>((id) =>
    ItemApi.destroy(id)
  );
}
