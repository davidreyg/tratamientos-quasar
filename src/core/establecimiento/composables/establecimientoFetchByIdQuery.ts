import { QueryTypes } from 'shared/enums';
import { MaybeRef } from 'vue';
import { useQuery } from 'vue-query';
import { EstablecimientoApi } from '../api';

export function useEstablecimientoFetchByIdQuery(
  id: number,
  enabled: MaybeRef<boolean>
) {
  const fetch = async () => (await EstablecimientoApi.fetchOne(id)).data().data;

  const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
    [QueryTypes.ESTABLECIMIENTO_ALL, id],
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
