import { QueryTypes } from 'shared/enums';
import { useQuery } from 'vue-query';
import { FinanciamientoFetchAllTask } from '../tasks';

export function useFinanciamientoFetchAllQuery() {
  const fetchAllRoles = async () => {
    return await FinanciamientoFetchAllTask.run();
  };

  const { data, isLoading, refetch, error } = useQuery(
    [QueryTypes.FINANCIAMIENTO_ALL],
    fetchAllRoles
  );

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}
