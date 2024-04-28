import { QueryTypes } from 'shared/enums';
import { Query } from 'shared/utils';
import { Ref } from 'vue';
import { useQuery } from 'vue-query';
import { CategoriaApi } from '../api';

export function useCategoriaFetchAllQuery(query?: Ref<Query | undefined>) {
  const fetch = async () => {
    return (await CategoriaApi.fetchAll(query?.value)).data().data;
  };

  const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
    [QueryTypes.EXAMEN_ALL, 'categoria'],
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
