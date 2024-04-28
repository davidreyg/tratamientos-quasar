import { QueryTypes } from 'shared/enums';
import { useQuery } from 'vue-query';
import { CategoriaApi } from '../api';

export function useTipoFetchAllQuery() {
  const fetch = async () => {
    return (await CategoriaApi.fetchAllTipos()).data().data;
  };

  const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
    [QueryTypes.EXAMEN_ALL, 'tipos'],
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
