import { QueryTypes } from 'shared/enums';
import { useQuery } from 'vue-query';
import { MedicoFetchAllTask } from '../tasks';

export function useMedicoFetchAllQuery() {
  const fetch = async () => await MedicoFetchAllTask.run();

  const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
    [QueryTypes.PERSONA_ALL, 'medicos'],
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
