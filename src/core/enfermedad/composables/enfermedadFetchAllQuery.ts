import { QueryTypes } from 'shared/enums';
import { useQuery } from 'vue-query';
import { EnfermedadFetchAllTask } from '../tasks';

export function useEnfermedadFetchAllQuery() {
  const fetch = async () => {
    return await EnfermedadFetchAllTask.run();
  };

  const { data, isLoading, refetch, error } = useQuery(
    [QueryTypes.ENFERMEDAD_ALL],
    fetch
  );

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}
