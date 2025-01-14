import { QueryTypes } from 'shared/enums';
import { useQuery } from 'vue-query';
import { ExamenApi } from '../api';

export function useTipoFetchAllQuery() {
  const fetch = async () => {
    return (await ExamenApi.fetchAllTipos()).data().data;
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
