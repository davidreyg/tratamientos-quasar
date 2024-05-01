import { QueryTypes } from 'shared/enums';
import { MaybeRef } from 'vue';
import { useQuery } from 'vue-query';
import { CategoriaApi } from '../api';

export function useCategoriaFetchByIdQuery(
  id: number,
  enabled: MaybeRef<boolean>
) {
  const fetch = async () => (await CategoriaApi.fetchOne(id)).data().data;

  const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
    [QueryTypes.CATEGORIA_ALL, id],
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
