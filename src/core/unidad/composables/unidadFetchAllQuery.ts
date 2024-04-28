import { QueryTypes } from 'shared/enums';
import { Query } from 'shared/utils';
import { Ref } from 'vue';
import { useQuery } from 'vue-query';
import { UnidadApi } from '../api';

export function useUnidadFetchAllQuery(query?: Ref<Query | undefined>) {
  const fetch = async () => {
    return (await UnidadApi.fetchAll(query?.value)).data().data;
  };

  const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
    [QueryTypes.UNIDAD_ALL],
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
