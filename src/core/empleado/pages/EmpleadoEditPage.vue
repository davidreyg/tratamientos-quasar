<template>
  <div class="row">
    <q-card v-if="isFetching" class="col-12 q-pa-lg">
      <skeleton-form class="col-12" :inputs="2" />
    </q-card>
    <empleado-edit-form
      v-if="isSuccess && !isFetching && data"
      :empleado="data"
      @submit="onSubmit"
      @cancel="$router.back()"
    />
  </div>
</template>

<script setup lang="ts">
import SkeletonForm from 'shared/components/skeletons/SkeletonForm.vue';
import { NotifyUtils } from 'shared/utils';
import { useRouter } from 'vue-router';
import EmpleadoEditForm from '../components/forms/EmpleadoEditForm.vue';
import { useEmpleadoFetchByIdQuery } from '../composables';

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});
const router = useRouter();
const { data, isSuccess, isFetching } = useEmpleadoFetchByIdQuery(
  props.id,
  true
);
const onSubmit = () => {
  NotifyUtils.success('Registro actualizado correctamente');
  router.back();
};
</script>

<style scoped></style>
