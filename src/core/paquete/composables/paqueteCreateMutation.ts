import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { PaqueteRequest } from '../requests';
import { PaqueteCreateTask } from '../tasks';

export function usePaqueteCreateMutation() {
  return useMutation<
    unknown,
    ApiatoError<PaqueteRequest>,
    PaqueteRequest,
    unknown
  >((data) => PaqueteCreateTask.run(data));
}
