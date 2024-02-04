import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { ControlCreateRequest } from '../requests';
import { CreateControlTask } from '../tasks';

export function useControlCreateMutation() {
  return useMutation<
    unknown,
    ApiatoError<ControlCreateRequest>,
    ControlCreateRequest,
    unknown
  >((data) => CreateControlTask.run(data));
}
