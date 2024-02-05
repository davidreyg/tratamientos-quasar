import { NotifyUtils } from 'shared/utils';
import { ref } from 'vue';
import { Reniec } from '../models/Reniec';
import { PersonaFetchReniecTask } from '../tasks';

export function usePersonaReniecQuery() {
  const reniec = ref<Reniec>();
  const isLoading = ref(false);
  const fetch = async (numero_documento: number) => {
    isLoading.value = true;
    reniec.value = undefined;
    try {
      reniec.value = await PersonaFetchReniecTask.run(numero_documento);
      if (reniec.value.id) {
        NotifyUtils.success('Ciudadano encontrado.');
      } else {
        NotifyUtils.error('No se encontro al ciudadano especificado.');
        reniec.value = undefined;
      }
      isLoading.value = false;
    } catch (error) {
      isLoading.value = false;
    }
  };

  return {
    reniec,
    isLoading,
    fetch,
  };
}
