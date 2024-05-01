<template>
  <div class="row">
    <q-card v-if="isFetching" class="col-xs-12 col-sm-6 q-pa-lg">
      <skeleton-form class="col-12" :inputs="1" />
    </q-card>

    <categoria-edit-form
      v-if="isSuccess && !isFetching && data"
      class="col-xs-12 col-sm-6"
      :categoria="data"
      :gol="data"
      @submit="onSubmit"
      @cancel="$router.back()"
    />
  </div>
</template>

<script setup lang="ts">
import SkeletonForm from 'shared/components/skeletons/SkeletonForm.vue';
import { NotifyUtils } from 'shared/utils';
import { useRouter } from 'vue-router';
import CategoriaEditForm from '../components/forms/CategoriaEditForm.vue';
import { useCategoriaFetchByIdQuery } from '../composables';

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});
const router = useRouter();
const { data, isSuccess, isFetching } = useCategoriaFetchByIdQuery(
  props.id,
  true
);
const onSubmit = () => {
  NotifyUtils.success('Registro actualizado correctamente');
  router.back();
};
</script>

<style scoped></style>
