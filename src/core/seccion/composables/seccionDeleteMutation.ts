import { useMutation } from 'vue-query';
import { SeccionApi } from '../api';

export function useSeccionDeleteMutation() {
  return useMutation<unknown, void, number, unknown>((id) =>
    SeccionApi.destroy(id)
  );
}
