<template>
  <base-page
    title="Tipo de documentos"
    :loading="isLoading"
    with-add
    @add="$router.push({ name: 'tipo-documentos.create' })"
  >
    <template #content>
      <tipo-documentos-table
        :data="data || []"
        :loading="isFetching"
        @edit="(id:number)=> $router.push({name:'tipo-documentos.edit',params:{id}})"
        @destroy-one="destroyOne"
      />
    </template>
  </base-page>
</template>

<script setup lang="ts">
import BasePage from 'shared/components/base/BasePage.vue';
import { NotifyUtils } from 'shared/utils';
import TipoDocumentosTable from '../components/tables/TipoDocumentosTable.vue';
import { useTipoDocumentoFetchAllQuery } from '../composables';

const { data, isFetching, isLoading, refetch } =
  useTipoDocumentoFetchAllQuery();

const destroyOne = () => {
  NotifyUtils.success('Registro eliminado correctamente.');
  refetch.value();
};
</script>
