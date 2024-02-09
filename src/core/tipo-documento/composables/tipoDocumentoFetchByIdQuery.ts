import { QueryTypes } from 'shared/enums';
import { MaybeRef } from 'vue';
import { useQuery } from 'vue-query';
import { TipoDocumentoFetchByIdTask } from '../tasks';

export function useTipoDocumentoFetchByIdQuery(
  id: number,
  enabled: MaybeRef<boolean>
) {
  const fetch = async () => await TipoDocumentoFetchByIdTask.run(id);

  const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
    [QueryTypes.TIPO_DOCUMENTO_ALL, id],
    fetch,
    { enabled: enabled }
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
