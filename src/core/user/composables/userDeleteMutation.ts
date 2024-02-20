import { useMutation } from 'vue-query';
import { UserApi } from '../api';

export function useUserDeleteMutation() {
  return useMutation<unknown, void, number, unknown>((id) =>
    UserApi.destroy(id)
  );
}
