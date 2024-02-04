import { QueryTypes } from 'shared/enums';
import { useQuery } from 'vue-query';
import { MedicamentoFetchAllTask } from '../tasks';

export function useMedicamentoFetchAllQuery() {
  const fetch = async () => {
    return await MedicamentoFetchAllTask.run();
  };

  const { data, isLoading, refetch, error } = useQuery(
    [QueryTypes.MEDICAMENTO_ALL],
    fetch
  );

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}
