import { QueryTypes } from 'shared/enums';
import { Query } from 'shared/utils';
import { Ref } from 'vue';
import { useQuery } from 'vue-query';
import { EstablecimientoApi } from '../api';

export function useEstablecimientoFetchAllQuery(
  query?: Ref<Query | undefined>
) {
  const fetch = async () =>
    (await EstablecimientoApi.fetchAll(query?.value)).data().data;

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
