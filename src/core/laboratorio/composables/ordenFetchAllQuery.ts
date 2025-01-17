import { QueryTypes } from 'shared/enums';
import { Query } from 'shared/utils';
import { Ref } from 'vue';
import { useQuery } from 'vue-query';
import { OrdenApi } from '../api';

export function useOrdenFetchAllQuery(query: Ref<Query | undefined>) {
  const fetch = async () => (await OrdenApi.fetchAll(query.value)).data();
  const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
    [QueryTypes.ORDEN_ALL, query?.value],
    fetch,
    { keepPreviousData: true }
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
