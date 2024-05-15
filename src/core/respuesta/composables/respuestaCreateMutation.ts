import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { RespuestaApi } from '../api';
import { RespuestaRequest } from '../requests';

export function useRespuestaCreateMutation() {
  return useMutation<
    unknown,
    ApiatoError<RespuestaRequest>,
    RespuestaRequest,
    unknown
  >((data) => RespuestaApi.create(data));
}
