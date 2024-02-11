import { QueryTypes } from 'shared/enums';
import { MaybeRef } from 'vue';
import { useQuery } from 'vue-query';
import { RoleFetchPrivilegiosTask } from '../tasks';

export function useRoleFetchPrivilegiosQuery(
  id: number,
  enabled: MaybeRef<boolean>
) {
  const fetch = async () => await RoleFetchPrivilegiosTask.run(id);
  const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
    [QueryTypes.ROLES_ALL, id, 'privilegios'],
    fetch,
    { enabled }
  );

  return {
    data,
    isLoading,
    isSuccess,
    isError,
    isFetching,
    refetch,
  };
}
