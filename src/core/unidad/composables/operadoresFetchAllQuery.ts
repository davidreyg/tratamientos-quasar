import { QueryTypes } from 'shared/enums';
import { useQuery } from 'vue-query';
import { UnidadApi } from '../api';

export function useOperadoresFetchAllQuery() {
  const fetch = async () => {
    return (await UnidadApi.fetchAllOperadores()).data().data;
  };

  const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
    [QueryTypes.UNIDAD_ALL, 'operadores'],
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
