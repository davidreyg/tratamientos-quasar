import { computed, ref } from 'vue';
import { Control } from '../models';
import { FetchControlesByPacienteTask } from '../tasks';

export function useFetchControlesByDiagnosticoQuery() {
  const controles = ref<Control[]>([]);
  const isLoading = ref(false);
  const fetch = async (diagnostico_id: string) => {
    isLoading.value = true;
    controles.value = [];
    try {
      controles.value = await FetchControlesByPacienteTask.run(diagnostico_id);
      isLoading.value = false;
    } catch (error) {
      isLoading.value = false;
    }
  };

  const isControlesEmpty = computed(() => {
    if (!controles.value) {
      return true;
    }
    if (controles.value && controles.value.length === 0) {
      return true;
    }
    return false;
  });

  return {
    controles,
    isControlesEmpty,
    isLoading,
    fetch,
  };
}
