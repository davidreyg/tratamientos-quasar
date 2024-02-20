import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { UserApi } from '../api';
import { UserRequest } from '../requests';

export function useUserCreateMutation() {
  return useMutation<unknown, ApiatoError<UserRequest>, UserRequest, unknown>(
    (data) => UserApi.create(data)
  );
}
