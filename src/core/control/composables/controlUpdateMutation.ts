import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { ControlCreateRequest } from '../requests';
import { UpdateControlTask } from '../tasks';

export function useControlUpdateMutation() {
  return useMutation<
    unknown,
    ApiatoError<ControlCreateRequest>,
    { data: ControlCreateRequest; id: string },
    unknown
  >(({ data, id }) => UpdateControlTask.run(data, id));
}
