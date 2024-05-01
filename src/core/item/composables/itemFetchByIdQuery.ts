import { QueryTypes } from 'shared/enums';
import { MaybeRef } from 'vue';
import { useQuery } from 'vue-query';
import { ItemApi } from '../api';

export function useItemFetchByIdQuery(id: number, enabled: MaybeRef<boolean>) {
  const fetch = async () => (await ItemApi.fetchOne(id)).data().data;

  const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
    [QueryTypes.ITEM_ALL, id],
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
