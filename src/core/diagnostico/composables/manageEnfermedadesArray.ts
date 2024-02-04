import { QSelectOption } from 'quasar';
import { NotifyUtils } from 'shared/utils';
import { useFieldArray } from 'vee-validate';
import { ref } from 'vue';

export function useManageEnfermedadesArray(field: string) {
  const arr_seleccionados = ref(<QSelectOption[]>[]);
  const {
    remove: removeField,
    push: pushField,
    fields,
  } = useFieldArray<string>(field);

  const push = (data: QSelectOption) => {
    const exists = arr_seleccionados.value.some(
      (item) => item.value === data.value
    );
    if (exists) {
      NotifyUtils.warn('Ya has agregado este item');
      return;
    }
    arr_seleccionados.value.push(data);
    pushField(data.value);
  };

  const remove = (id: number) => {
    arr_seleccionados.value.splice(id, 1);
    removeField(id);
  };

  return {
    arr_seleccionados,
    push,
    remove,
    fields,
  };
}
