<template>
  <seccion-table
    :data="data || []"
    :loading="isFetching"
    @edit="(id:number)=> $router.push({name:'seccions.edit',params:{id}})"
    @destroy-one="destroyOne"
  />
</template>

<script setup lang="ts">
import { NotifyUtils } from 'shared/utils';
import SeccionTable from '../components/tables/SeccionTable.vue';
import { useSeccionFetchAllQuery } from '../composables';

const { data, isFetching, refetch } = useSeccionFetchAllQuery();

const destroyOne = () => {
  NotifyUtils.success('Registro eliminado correctamente.');
  refetch.value();
};
</script>
