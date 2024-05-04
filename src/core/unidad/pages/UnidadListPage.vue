<template>
  <unidad-table
    :data="data || []"
    :loading="isFetching"
    @edit="(id:number)=> $router.push({name:'unidads.edit',params:{id}})"
    @destroy-one="destroyOne"
  />
</template>

<script setup lang="ts">
import { NotifyUtils } from 'shared/utils';
import UnidadTable from '../components/tables/UnidadTable.vue';
import { useUnidadFetchAllQuery } from '../composables';

const { data, isFetching, refetch } = useUnidadFetchAllQuery();

const destroyOne = () => {
  NotifyUtils.success('Registro eliminado correctamente.');
  refetch.value();
};
</script>
