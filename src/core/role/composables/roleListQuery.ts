import { QueryTypes } from 'shared/enums';
import { useQuery } from 'vue-query';
import { FetchAllRolesTask } from '../tasks';

export function useRoleListQuery() {
  const fetchAllRoles = async () => {
    return await FetchAllRolesTask.run({ include: 'privileges' });
  };

  const {
    data: roles,
    isLoading: isRolesLoading,
    refetch,
    error: rolesError,
  } = useQuery([QueryTypes.ROLES_ALL], fetchAllRoles);

  return {
    roles,
    isRolesLoading,
    rolesError,
    refetch,
  };
}
