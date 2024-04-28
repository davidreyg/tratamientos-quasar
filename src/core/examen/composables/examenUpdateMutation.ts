import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { ExamenApi } from '../api';
import { ExamenRequest } from '../requests';

export function useExamenUpdateMutation() {
  return useMutation<
    unknown,
    ApiatoError<ExamenRequest>,
    { data: ExamenRequest; id: number },
    unknown
  >(({ data, id }) => ExamenApi.update(data, id));
}
