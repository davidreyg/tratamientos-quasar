import { QueryTypes } from 'shared/enums';
import { Query } from 'shared/utils';
import { Ref } from 'vue';
import { useQuery } from 'vue-query';
import { RespuestaApi } from '../api';

export function useRespuestaFetchAllQuery(query?: Ref<Query | undefined>) {
  const fetch = async () => {
    return (await RespuestaApi.fetchAll(query?.value)).data().data;
  };

  const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
    [QueryTypes.RESPUESTA_ALL],
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
