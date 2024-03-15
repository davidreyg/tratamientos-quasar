import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { OrdenApi } from '../api';
import { OrdenResultadosRequest } from '../requests';

export function useOrdenUpdateExamensMutation() {
  return useMutation<
    unknown,
    ApiatoError<OrdenResultadosRequest>,
    { id: number; data: OrdenResultadosRequest },
    unknown
  >(({ id, data }) => OrdenApi.updateExamens(id, data));
}
