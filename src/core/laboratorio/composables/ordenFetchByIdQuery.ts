import { QueryTypes } from 'shared/enums';
import { MaybeRef, Ref } from 'vue';
import { useQuery } from 'vue-query';
import { OrdenApi } from '../api';

export function useOrdenFetchByIdQuery(
  id: Ref<number>,
  enabled: MaybeRef<boolean>
) {
  const fetch = async () => (await OrdenApi.fetchById(id.value)).data().data;

  const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
    [QueryTypes.ORDEN_ALL, id.value],
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
