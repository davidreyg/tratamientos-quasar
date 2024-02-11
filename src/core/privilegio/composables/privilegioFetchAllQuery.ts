import { QueryTypes } from 'shared/enums';
import { useQuery } from 'vue-query';
import { PrivilegioFetchAllTask } from '../tasks';

export function usePrivilegioFetchAllQuery() {
  const fetch = async () => {
    return await PrivilegioFetchAllTask.run();
  };

  const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
    [QueryTypes.PRIVILEGIO_ALL],
    fetch
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
