import { computed, ref } from 'vue';
import { Diagnostico } from '../models';
import { FetchDiagnosticoByIdTask } from '../tasks';

export function useFetchDiagnosticoByIdQuery() {
  const diagnostico = ref<Diagnostico>();
  const isLoading = ref(false);
  const fetch = async (id: string) => {
    isLoading.value = true;
    diagnostico.value = undefined;
    try {
      diagnostico.value = await FetchDiagnosticoByIdTask.run(id);
      isLoading.value = false;
    } catch (error) {
      isLoading.value = false;
    }
  };

  const isDiagnosticoEmpty = computed(() => {
    if (!diagnostico.value) {
      return true;
    }
    return false;
  });

  return {
    diagnostico,
    isDiagnosticoEmpty,
    isLoading,
    fetch,
  };
}
