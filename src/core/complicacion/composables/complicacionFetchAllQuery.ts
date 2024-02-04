import { QueryTypes } from 'shared/enums';
import { useQuery } from 'vue-query';
import { ComplicacionFetchAllTask } from '../tasks';

export function useComplicacionFetchAllQuery() {
  const fetch = async () => {
    return await ComplicacionFetchAllTask.run();
  };

  const { data, isLoading, refetch, error } = useQuery(
    [QueryTypes.COMPLICACION_ALL],
    fetch
  );

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}
