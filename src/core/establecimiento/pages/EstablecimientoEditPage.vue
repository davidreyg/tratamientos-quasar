<template>
  <div class="row">
    <q-card v-if="isFetching" class="col-xs-12 col-sm-10 q-pa-lg">
      <skeleton-form class="col-12" :inputs="4" />
    </q-card>

    <establecimiento-edit-form
      v-if="isSuccess && !isFetching && data"
      class="col-xs-12 col-sm-10"
      :establecimiento="data"
      @submit="onSubmit"
      @cancel="$router.back()"
    />
  </div>
</template>

<script setup lang="ts">
import SkeletonForm from 'shared/components/skeletons/SkeletonForm.vue';
import { NotifyUtils } from 'shared/utils';
import { useRouter } from 'vue-router';
import EstablecimientoEditForm from '../components/forms/EstablecimientoEditForm.vue';
import { useEstablecimientoFetchByIdQuery } from '../composables';

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});
const router = useRouter();
const { data, isSuccess, isFetching } = useEstablecimientoFetchByIdQuery(
  props.id,
  true
);
const onSubmit = () => {
  NotifyUtils.success('Registro actualizado correctamente');
  router.back();
};
</script>

<style scoped></style>
