import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { OrdenApi } from '../api';

export function useOrdenUpdateEstadoMutation() {
  return useMutation<
    unknown,
    ApiatoError<{ estado: boolean }>,
    { id: number; data: { estado: number } },
    unknown
  >(({ id, data }) => OrdenApi.updateEstado(id, data));
}
