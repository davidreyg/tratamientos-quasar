import { QueryTypes } from 'shared/enums';
import { MaybeRef } from 'vue';
import { useQuery } from 'vue-query';
import { PaqueteFetchByIdTask } from '../tasks';

export function usePaqueteFetchByIdQuery(
  id: number,
  enabled: MaybeRef<boolean>
) {
  const fetch = async () => await PaqueteFetchByIdTask.run(id);

  const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
    [QueryTypes.PAQUETE_ALL, id],
    fetch,
    { enabled: enabled }
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
