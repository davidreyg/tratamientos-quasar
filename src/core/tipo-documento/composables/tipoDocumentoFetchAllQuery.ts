import { QueryTypes } from 'shared/enums';
import { useQuery } from 'vue-query';
import { TipoDocumentoFetchAllTask } from '../tasks';

export function useTipoDocumentoFetchAllQuery() {
  const fetch = async () => await TipoDocumentoFetchAllTask.run();

  const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
    [QueryTypes.TIPO_DOCUMENTO_ALL],
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
