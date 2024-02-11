import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { EmpleadoApi } from '../api';
import { EmpleadoRequest } from '../requests';

export function useEmpleadoUpdateMutation() {
  return useMutation<
    unknown,
    ApiatoError<EmpleadoRequest>,
    { data: EmpleadoRequest; id: number },
    unknown
  >(({ data, id }) => EmpleadoApi.update(data, id));
}
