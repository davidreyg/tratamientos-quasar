import {
  ConfirmCurrentPasswordApi,
  ConfirmCurrentPasswordRequest,
} from 'shared/api/ConfirmCurrentPasswordApi';
import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';

export function useConfirmCurrentPasswordMutation() {
  return useMutation<
    unknown,
    ApiatoError<ConfirmCurrentPasswordRequest>,
    ConfirmCurrentPasswordRequest,
    unknown
  >((data) => ConfirmCurrentPasswordApi.confirmCurrentPassword(data));
}
