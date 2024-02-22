import { QueryTypes } from 'shared/enums';
import { useQuery } from 'vue-query';
import { TriajeApi } from '../api';

export function useTriajeFetchByIdQuery(id: number, enabled: boolean) {
  const fetch = async () => (await TriajeApi.findById(id)).data().data;

  const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
    [QueryTypes.TRIAJE_ALL, id],
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
