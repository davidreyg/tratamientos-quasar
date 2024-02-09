import { NotifyUtils } from 'shared/utils';
import { ref } from 'vue';
import { sttpClient } from '..';
import { Reniec } from '../models/Reniec';

export function usePersonaReniecQuery() {
  const reniec = ref<Reniec>();
  const isLoading = ref(false);
  const fetch = async (numero_documento: number) => {
    isLoading.value = true;
    reniec.value = undefined;
    try {
      reniec.value = await reniecfetch(numero_documento);
      NotifyUtils.success('Ciudadano encontrado.');
      // if (reniec.value.id) {
      // } else {
      //   NotifyUtils.error('No se encontro al ciudadano especificado.');
      //   reniec.value = undefined;
      // }
      isLoading.value = false;
    } catch (error) {
      isLoading.value = false;
    }
  };

  const reniecfetch = async (numero_documento: number) => {
    return (
      await sttpClient.get<Reniec>(`/personas/reniec/${numero_documento}`)
    ).data().data;
  };

  return {
    reniec,
    isLoading,
    fetch,
  };
}
