<template>
  <paquete-table
    :data="data || []"
    :loading="isFetching"
    @edit="(id:number)=> $router.push({name:'paquetes.edit',params:{id}})"
    @destroy-one="destroyOne"
  />
</template>

<script setup lang="ts">
import { NotifyUtils } from 'shared/utils';
import PaqueteTable from '../components/tables/PaqueteTable.vue';
import { usePaqueteFetchAllQuery } from '../composables';

const { data, isFetching, refetch } = usePaqueteFetchAllQuery();

const destroyOne = () => {
  NotifyUtils.success('Registro eliminado correctamente.');
  refetch.value();
};
</script>
