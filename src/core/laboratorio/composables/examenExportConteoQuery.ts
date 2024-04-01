import { QueryTypes } from 'shared/enums';
import { useQuery } from 'vue-query';
import { OrdenApi } from '../api';

export function useExamenExportConteoQuery() {
  const fetch = async () => (await OrdenApi.exportConteoExamens()).data();
  const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
    [QueryTypes.EXAMEN_ALL, 'conteo'],
    fetch,
    { enabled: false }
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
