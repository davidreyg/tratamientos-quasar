import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { RespuestaApi } from '../api';
import { RespuestaRequest } from '../requests';

export function useRespuestaUpdateMutation() {
  return useMutation<
    unknown,
    ApiatoError<RespuestaRequest>,
    { data: RespuestaRequest; id: number },
    unknown
  >(({ data, id }) => RespuestaApi.update(data, id));
}
