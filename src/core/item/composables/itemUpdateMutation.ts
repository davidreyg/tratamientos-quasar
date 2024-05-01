import { ApiatoError } from 'shared/utils';
import { useMutation } from 'vue-query';
import { ItemApi } from '../api';
import { ItemRequest } from '../requests';

export function useItemUpdateMutation() {
  return useMutation<
    unknown,
    ApiatoError<ItemRequest>,
    { data: ItemRequest; id: number },
    unknown
  >(({ data, id }) => ItemApi.update(data, id));
}
