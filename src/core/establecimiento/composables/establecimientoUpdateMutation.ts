import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { EstablecimientoApi } from '../api';
import { EstablecimientoRequest } from '../requests';

export function useEstablecimientoUpdateMutation() {
  return useMutation<
    unknown,
    ApiatoError<EstablecimientoRequest>,
    { data: EstablecimientoRequest; id: number },
    unknown
  >(({ data, id }) => EstablecimientoApi.update(data, id));
}
