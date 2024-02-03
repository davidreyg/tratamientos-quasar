import { QSelectOption } from 'quasar';
import { NotifyUtils } from 'shared/utils';
import { useFieldArray } from 'vee-validate';
import { ref } from 'vue';

export function useManageEnfermedadesArray(field: string) {
  const arr_enfermedades_seleccionadas = ref(<QSelectOption[]>[]);
  const {
    remove: removeField,
    push: pushField,
    fields,
  } = useFieldArray<string>(field);

  const push = (data: QSelectOption) => {
    const exists = arr_enfermedades_seleccionadas.value.some(
      (item) => item.value === data.value
    );
    if (exists) {
      NotifyUtils.warn('Ya has agregado esta enfermedad');
      return;
    }
    arr_enfermedades_seleccionadas.value.push(data);
    pushField(data.value);
  };

  const remove = (id: number) => {
    arr_enfermedades_seleccionadas.value.splice(id, 1);
    removeField(id);
  };

  return {
    arr_enfermedades_seleccionadas,
    push,
    remove,
    fields,
  };
}
