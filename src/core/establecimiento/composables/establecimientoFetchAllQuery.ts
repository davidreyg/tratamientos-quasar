import { QueryTypes } from 'shared/enums';
import { useQuery } from 'vue-query';
import { EstablecimientoApi } from '../api';

export function useEstablecimientoFetchAllQuery() {
  const fetch = async () => (await EstablecimientoApi.fetchAll()).data().data;

  const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
    [QueryTypes.ESTABLECIMIENTO_ALL],
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
