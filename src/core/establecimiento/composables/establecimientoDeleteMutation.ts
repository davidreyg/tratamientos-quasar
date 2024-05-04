import { useMutation } from 'vue-query';
import { EstablecimientoApi } from '../api';

export function useEstablecimientoDeleteMutation() {
  return useMutation<unknown, void, number, unknown>((id) =>
    EstablecimientoApi.destroy(id)
  );
}
