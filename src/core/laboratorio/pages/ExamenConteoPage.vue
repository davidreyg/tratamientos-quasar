<template>
  <div class="row q-col-gutter-md">
    <div class="col-12">
      <q-btn
        color="positive"
        icon="fas fa-file-excel"
        label="Exportar a excel"
        no-caps
        @click="exportToExcel"
      />
    </div>
    <examen-conteo-card v-if="examens" :examens="examens" />
  </div>
</template>

<script setup lang="ts">
import ExamenConteoCard from 'core/examen/components/ExamenConteoCard.vue';
import { Query } from 'shared/utils';
import { ref } from 'vue';
import {
  useExamenExportConteoQuery,
  useExamenGetConteoQuery,
} from '../composables';

const query = ref<Query>({});
const { data: examens } = useExamenGetConteoQuery(query);

const { refetch, data } = useExamenExportConteoQuery();
const exportToExcel = async () => {
  await refetch.value();
  if (data.value) {
    const url = window.URL.createObjectURL(new Blob([data.value]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'conteo_examenes.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
</script>
