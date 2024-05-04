import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { EstablecimientoApi } from '../api';
import { EstablecimientoRequest } from '../requests';

export function useEstablecimientoCreateMutation() {
  return useMutation<
    unknown,
    ApiatoError<EstablecimientoRequest>,
    EstablecimientoRequest,
    unknown
  >((data) => EstablecimientoApi.create(data));
}
