import { QueryTypes } from 'shared/enums';
import { Query } from 'shared/utils';
import { Ref } from 'vue';
import { useQuery } from 'vue-query';
import { UserApi } from '../api';

export function useUserFetchAllQuery(query: Ref<Query | undefined>) {
  const fetch = async () => (await UserApi.fetchAll(query.value)).data();

  const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
    [QueryTypes.USERS, query.value],
    fetch,
    { keepPreviousData: true }
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
