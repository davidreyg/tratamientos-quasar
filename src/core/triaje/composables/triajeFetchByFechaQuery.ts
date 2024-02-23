import { ref } from 'vue';
import { TriajeApi } from '../api';
import { Triaje } from '../models';

export function useTriajeFetchByFechaQuery() {
  const triaje = ref<Triaje>();
  const isLoading = ref(false);
  const fetch = async (fecha: Date | string, paciente_id: number) => {
    isLoading.value = true;
    triaje.value = undefined;
    try {
      triaje.value = (
        await TriajeApi.fetchAll({
          search: `fecha_registro:${fecha};paciente_id:${paciente_id}`,
          searchJoin: 'and',
        })
      ).data().data[0];
      isLoading.value = false;
    } catch (error) {
      isLoading.value = false;
    }
  };

  return {
    triaje,
    isLoading,
    fetch,
  };
}
