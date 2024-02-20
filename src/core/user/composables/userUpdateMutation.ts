import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { UserApi } from '../api';
import { UserRequest } from '../requests';

export function useUserUpdateMutation() {
  return useMutation<
    unknown,
    ApiatoError<UserRequest>,
    { data: UserRequest; id: number },
    unknown
  >(({ data, id }) => UserApi.update(data, id));
}
