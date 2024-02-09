import { computed, ref } from 'vue';
import { Diagnostico } from '../models';
import { FetchDiagnosticosByPacienteTask } from '../tasks';

export function useFetchDiagnosticosByPacienteQuery() {
  const diagnosticos = ref<Diagnostico[]>();
  const isLoading = ref(false);
  const fetch = async (paciente_id: string) => {
    isLoading.value = true;
    diagnosticos.value = undefined;
    try {
      diagnosticos.value = await FetchDiagnosticosByPacienteTask.run(
        paciente_id
      );
      isLoading.value = false;
    } catch (error) {
      isLoading.value = false;
    }
  };

  const isDiagnosticosEmpty = computed(() => {
    if (!diagnosticos.value) {
      return true;
    }
    if (diagnosticos.value && diagnosticos.value.length === 0) {
      return true;
    }
    return false;
  });

  return {
    diagnosticos,
    isDiagnosticosEmpty,
    isLoading,
    fetch,
  };
}
