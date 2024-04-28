<template>
  <div class="row">
    <q-card v-if="isFetching" class="col-xs-12 col-sm-10 q-pa-lg">
      <skeleton-form class="col-12" :inputs="3" />
    </q-card>

    <examen-edit-form
      v-if="isSuccess && !isFetching && data"
      class="col-xs-12 col-sm-10"
      :examen="data"
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
import ExamenEditForm from '../components/forms/ExamenEditForm.vue';
import { useExamenFetchByIdQuery } from '../composables';
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});
const router = useRouter();
const { data, isSuccess, isFetching } = useExamenFetchByIdQuery(props.id, true);
const onSubmit = () => {
  NotifyUtils.success('Registro actualizado correctamente');
  router.back();
};
</script>
