import { QueryTypes } from 'shared/enums';
import { Query } from 'shared/utils';
import { Ref } from 'vue';
import { useQuery } from 'vue-query';
import { DiagnosticoApi } from '../api';

export function useDiagnosticoFetchAllQuery(query: Ref<Query | undefined>) {
  const fetch = async () => (await DiagnosticoApi.fetchAll(query.value)).data();
  const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
    [QueryTypes.DIAGNOSTICO_ALL, query?.value],
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
