import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { PaqueteRequest } from '../requests';
import { PaqueteUpdateTask } from '../tasks';

export function usePaqueteUpdateMutation() {
  return useMutation<
    unknown,
    ApiatoError<PaqueteRequest>,
    { data: PaqueteRequest; id: number },
    unknown
  >(({ data, id }) => PaqueteUpdateTask.run(data, id));
}
