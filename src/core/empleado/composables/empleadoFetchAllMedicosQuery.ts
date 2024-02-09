import { QueryTypes } from 'shared/enums';
import { useQuery } from 'vue-query';
import { EmpleadoFetchAllMedicosTask } from '../tasks';

export function useEmpleadoFetchAllMedicosQuery() {
  const fetch = async () => await EmpleadoFetchAllMedicosTask.run();

  const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
    [QueryTypes.EMPLEADOS_ALL, 'medicos'],
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
