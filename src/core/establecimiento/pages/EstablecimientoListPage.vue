<template>
  <establecimiento-table
    :data="data || []"
    :loading="isFetching"
    @edit="(id:number)=> $router.push({name:'establecimientos.edit',params:{id}})"
    @destroy-one="destroyOne"
  />
</template>

<script setup lang="ts">
import { NotifyUtils, Query } from 'shared/utils';
import { ref } from 'vue';
import EstablecimientoTable from '../components/tables/EstablecimientoTable.vue';
import { useEstablecimientoFetchAllQuery } from '../composables';

const query = ref<Query>({ limit: 0 });
const { data, isFetching, refetch } = useEstablecimientoFetchAllQuery(query);

const destroyOne = () => {
  NotifyUtils.success('Registro eliminado correctamente.');
  refetch.value();
};
</script>
