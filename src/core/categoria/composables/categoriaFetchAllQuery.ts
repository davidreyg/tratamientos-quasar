import { QueryTypes } from 'shared/enums';
import { useQuery } from 'vue-query';
import { CategoriaApi } from '../api';

export function useCategoriaFetchAllQuery() {
  const fetch = async () => (await CategoriaApi.fetchAll()).data().data;

  const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
    [QueryTypes.CATEGORIA_ALL],
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
