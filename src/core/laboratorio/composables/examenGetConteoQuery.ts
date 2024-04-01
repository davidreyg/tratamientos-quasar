import { QueryTypes } from 'shared/enums';
import { Query } from 'shared/utils';
import { Ref } from 'vue';
import { useQuery } from 'vue-query';
import { OrdenApi } from '../api';

export function useExamenGetConteoQuery(query: Ref<Query | undefined>) {
  const fetch = async () =>
    (await OrdenApi.getConteoExamens(query.value)).data().data;
  const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
    [QueryTypes.EXAMEN_ALL, 'conteo', query?.value],
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
