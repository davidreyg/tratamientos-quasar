import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { UserApi } from '../api';
import { UserUpdateRequest } from '../requests';

export function useUserUpdateMutation() {
  return useMutation<
    unknown,
    ApiatoError<UserUpdateRequest>,
    { data: UserUpdateRequest; id: number },
    unknown
  >(({ data, id }) => UserApi.update(data, id));
}
