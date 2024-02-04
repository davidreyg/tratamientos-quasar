import { computed, ref } from 'vue';
import { Control } from '../models';
import { FetchControlByIdTask } from '../tasks';

export function useFetchControlByIdQuery() {
  const control = ref<Control>();
  const isLoading = ref(false);
  // const {
  //   fetch: fetchControles,
  //   controles,
  //   isControlesEmpty,
  // } = useFetchControlesByControlQuery();
  const fetch = async (id: string) => {
    isLoading.value = true;
    control.value = undefined;
    try {
      control.value = await FetchControlByIdTask.run(id);
      // controles.value = [];
      // if (control.value) {
      //   await fetchControles(control.value.id);
      // }
      isLoading.value = false;
    } catch (error) {
      isLoading.value = false;
    }
  };

  const isControlEmpty = computed(() => {
    if (!control.value) {
      return true;
    }
    return false;
  });

  return {
    control,
    // controles,
    isControlEmpty,
    // isControlesEmpty,
    isLoading,
    fetch,
  };
}
