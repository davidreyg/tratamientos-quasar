import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore('app', () => {
  const APP_LOADING = ref(false);

  function isAppLoading(loading: boolean) {
    APP_LOADING.value = loading;
  }
  function $reset() {
    APP_LOADING.value = false;
  }

  return { APP_LOADING, $reset, isAppLoading };
});
