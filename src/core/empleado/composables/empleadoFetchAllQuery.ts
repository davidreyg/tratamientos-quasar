import { QueryTypes } from 'shared/enums';
import { Query } from 'shared/utils';
import { Ref } from 'vue';
import { useQuery } from 'vue-query';
import { EmpleadoFetchAllTask } from '../tasks';

export function useEmpleadoFetchAllQuery(query: Ref<Query | undefined>) {
  const fetch = async () => await EmpleadoFetchAllTask.run(query.value);
  const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
    [QueryTypes.EMPLEADOS_ALL, query?.value],
    fetch,
    { keepPreviousData: true }
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
