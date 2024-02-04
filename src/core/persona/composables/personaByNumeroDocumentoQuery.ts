import { useFetchDiagnosticosByPacienteQuery } from 'core/diagnostico';
import { ref } from 'vue';
import { Persona } from '../models';
import { PersonaFetchByNumeroDocumentoTask } from '../tasks/PersonaFetchByNumeroDocumentoTask';

export function usePersonaByNumeroDocumentoQuery() {
  const persona = ref<Persona>();
  const isLoading = ref(false);
  const {
    fetch: fetchDiagnosticos,
    diagnosticos,
    isDiagnosticosEmpty,
  } = useFetchDiagnosticosByPacienteQuery();
  const fetch = async (numero_documento: number) => {
    isLoading.value = true;
    persona.value = undefined;
    try {
      persona.value = await PersonaFetchByNumeroDocumentoTask.run(
        numero_documento
      );
      diagnosticos.value = undefined;
      if (persona.value) {
        await fetchDiagnosticos(persona.value.id);
      }
      isLoading.value = false;
    } catch (error) {
      isLoading.value = false;
    }
  };

  return {
    persona,
    diagnosticos,
    isDiagnosticosEmpty,
    isLoading,
    fetch,
    fetchDiagnosticos,
  };
}
