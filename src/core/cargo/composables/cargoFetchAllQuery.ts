import { QueryTypes } from 'shared/enums';
import { useQuery } from 'vue-query';
import { CargoApi } from '../api';

export function useCargoFetchAllQuery() {
  const fetch = async () => (await CargoApi.fetchAll()).data().data;

  const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
    [QueryTypes.CARGO_ALL],
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
