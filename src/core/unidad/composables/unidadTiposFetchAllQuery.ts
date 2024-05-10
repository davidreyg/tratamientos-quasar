import { QueryTypes } from 'shared/enums';
import { useQuery } from 'vue-query';
import { UnidadApi } from '../api';

export function useUnidadTiposFetchAllQuery() {
  const fetch = async () => {
    return (await UnidadApi.fetchAllUnidadTipos()).data().data;
  };

  const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
    [QueryTypes.UNIDAD_ALL, 'tipos'],
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
