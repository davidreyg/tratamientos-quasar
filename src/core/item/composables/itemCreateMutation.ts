import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { ItemApi } from '../api';
import { ItemRequest } from '../requests';

export function useItemCreateMutation() {
  return useMutation<unknown, ApiatoError<ItemRequest>, ItemRequest, unknown>(
    (data) => ItemApi.create(data)
  );
}
