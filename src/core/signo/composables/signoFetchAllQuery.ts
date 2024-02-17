import { QueryTypes } from 'shared/enums';
import { useQuery } from 'vue-query';
import { SignoApi } from '../api';

export function useSignoFetchAllQuery() {
  const fetch = async () => {
    return (await SignoApi.fetchAll()).data().data;
  };

  const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
    [QueryTypes.SIGNO_ALL],
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
