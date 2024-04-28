import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { ExamenApi } from '../api';
import { ExamenRequest } from '../requests';

export function useExamenCreateMutation() {
  return useMutation<
    unknown,
    ApiatoError<ExamenRequest>,
    ExamenRequest,
    unknown
  >((data) => ExamenApi.create(data));
}
