import { QueryTypes } from 'shared/enums';
import { MaybeRef } from 'vue';
import { useQuery } from 'vue-query';
import { ExamenApi } from '../api';

export function useExamenFetchByIdQuery(
  id: number,
  enabled: MaybeRef<boolean>
) {
  const fetch = async () => (await ExamenApi.fetchOne(id)).data().data;

  const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
    [QueryTypes.EXAMEN_ALL, id],
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
