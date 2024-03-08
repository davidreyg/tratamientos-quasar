import { QueryTypes } from 'shared/enums';
import { useQuery } from 'vue-query';
import { PaqueteFetchAllTask } from '../tasks';

export function usePaqueteFetchAllQuery() {
  const fetch = async () => await PaqueteFetchAllTask.run();

  const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
    [QueryTypes.PAQUETE_ALL],
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
