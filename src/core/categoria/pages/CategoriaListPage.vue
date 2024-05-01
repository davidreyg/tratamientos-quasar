<template>
  <categoria-table
    :data="data || []"
    :loading="isFetching"
    @edit="(id:number)=> $router.push({name:'categorias.edit',params:{id}})"
    @destroy-one="destroyOne"
  />
</template>

<script setup lang="ts">
import { NotifyUtils } from 'shared/utils';
import CategoriaTable from '../components/tables/CategoriaTable.vue';
import { useCategoriaFetchAllQuery } from '../composables';

const { data, isFetching, refetch } = useCategoriaFetchAllQuery();

const destroyOne = () => {
  NotifyUtils.success('Registro eliminado correctamente.');
  refetch.value();
};
</script>
