<template>
  <base-page title="Editar Tipo de Documento" :loading="isLoading">
    <template #content>
      <div class="row">
        <q-card v-if="isFetching" class="col-6 q-pa-lg">
          <skeleton-form class="col-12" />
        </q-card>

        <tipo-documento-edit-form
          v-if="isSuccess && !isFetching && data"
          :tipo-documento="data"
          :gol="data"
          @submit="onSubmit"
          @cancel="$router.back()"
        />
      </div>
    </template>
  </base-page>
</template>

<script setup lang="ts">
import BasePage from 'shared/components/base/BasePage.vue';
import SkeletonForm from 'shared/components/skeletons/SkeletonForm.vue';
import { NotifyUtils } from 'shared/utils';
import { useRouter } from 'vue-router';
import TipoDocumentoEditForm from '../components/forms/TipoDocumentoEditForm.vue';
import { useTipoDocumentoFetchByIdQuery } from '../composables';

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});
const router = useRouter();
const { data, isSuccess, isFetching, isLoading } =
  useTipoDocumentoFetchByIdQuery(props.id, true);
const onSubmit = () => {
  NotifyUtils.success('Registro actualizado correctamente');
  router.back();
};
</script>

<style scoped></style>
