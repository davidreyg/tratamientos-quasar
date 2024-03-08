import { QueryTypes } from 'shared/enums';
import { Query } from 'shared/utils';
import { Ref } from 'vue';
import { useQuery } from 'vue-query';
import { ExamenApi } from '../api';

export function useExamenFetchAllQuery(query?: Ref<Query | undefined>) {
  const fetch = async () => {
    return (await ExamenApi.fetchAll(query?.value)).data().data;
  };

  const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
    [QueryTypes.EXAMEN_ALL],
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
