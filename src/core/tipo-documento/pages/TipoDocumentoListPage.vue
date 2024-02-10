<template>
  <tipo-documentos-table
    :data="data || []"
    :loading="isFetching"
    @edit="(id:number)=> $router.push({name:'tipo-documentos.edit',params:{id}})"
    @destroy-one="destroyOne"
  />
</template>

<script setup lang="ts">
import { NotifyUtils } from 'shared/utils';
import TipoDocumentosTable from '../components/tables/TipoDocumentosTable.vue';
import { useTipoDocumentoFetchAllQuery } from '../composables';

const { data, isFetching, refetch } = useTipoDocumentoFetchAllQuery();

const destroyOne = () => {
  NotifyUtils.success('Registro eliminado correctamente.');
  refetch.value();
};
</script>
