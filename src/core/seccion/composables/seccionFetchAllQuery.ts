import { QueryTypes } from 'shared/enums';
import { Query } from 'shared/utils';
import { Ref } from 'vue';
import { useQuery } from 'vue-query';
import { SeccionApi } from '../api';

export function useSeccionFetchAllQuery(query?: Ref<Query | undefined>) {
  const fetch = async () => {
    return (await SeccionApi.fetchAll(query?.value)).data().data;
  };

  const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
    [QueryTypes.SECCION_ALL],
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
