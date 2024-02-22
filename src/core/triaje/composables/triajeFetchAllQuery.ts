import { QueryTypes } from 'shared/enums';
import { Query } from 'shared/utils';
import { Ref } from 'vue';
import { useQuery } from 'vue-query';
import { TriajeApi } from '../api';

export function useTriajeFetchAllQuery(
  query: Ref<Query | undefined>,
  enabled: Ref<boolean>
) {
  const fetch = async () => {
    return (await TriajeApi.fetchAll(query.value)).data().data;
  };

  const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
    [QueryTypes.TRIAJE_ALL],
    fetch,
    {
      enabled,
    }
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
