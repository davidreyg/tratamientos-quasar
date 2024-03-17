import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { OrdenApi } from '../api';

export function useOrdenVerificarMutation() {
  return useMutation<
    unknown,
    ApiatoError<{ estado: boolean }>,
    number,
    unknown
  >((id) => OrdenApi.verificar(id));
}
