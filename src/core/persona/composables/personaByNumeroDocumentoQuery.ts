import { ref } from 'vue';
import { Persona } from '../models';
import { PersonaFetchByNumeroDocumentoTask } from '../tasks/PersonaFetchByNumeroDocumentoTask';

export function usePersonaByNumeroDocumentoQuery() {
  const persona = ref<Persona>();
  const isLoading = ref(false);
  const fetch = async (numero_documento: number) => {
    isLoading.value = true;
    persona.value = undefined;
    try {
      persona.value = await PersonaFetchByNumeroDocumentoTask.run(
        numero_documento
      );
      isLoading.value = false;
    } catch (error) {
      isLoading.value = false;
    }
  };
  // const fetch = async () =>
  //   await PersonaFetchByNumeroDocumentoTask.run(numero_documento.value);
  // const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
  //   [QueryTypes.PERSONA_ALL, numero_documento],
  //   fetch,
  //   { enabled }
  // );

  return {
    persona,
    isLoading,
    fetch,
  };
}
