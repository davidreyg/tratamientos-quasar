import { useMutation } from 'vue-query';
import { RespuestaApi } from '../api';

export function useRespuestaDeleteMutation() {
  return useMutation<unknown, void, number, unknown>((id) =>
    RespuestaApi.destroy(id)
  );
}
