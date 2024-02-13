import { useMutation } from 'vue-query';
import { RoleApi } from '../api';

export function useRoleSyncPrivilegiosMutation() {
  return useMutation<unknown, unknown, { data: string[]; id: number }, unknown>(
    ({ data, id }) => RoleApi.syncRolePrivilegios(id, data)
  );
}
