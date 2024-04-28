<template>
  <examen-table
    :data="data || []"
    :loading="isFetching"
    @edit="(id:number)=> $router.push({name:'examens.edit',params:{id}})"
    @destroy-one="destroyOne"
  />
</template>

<script setup lang="ts">
import { NotifyUtils, Query } from 'shared/utils';
import { ref } from 'vue';
import ExamenTable from '../components/tables/ExamenTable.vue';
import { useExamenFetchAllQuery } from '../composables';

const query = ref<Query>({
  limit: 0,
  // search: 'is_active:1',
  searchJoin: 'and',
});
const { data, isFetching, refetch } = useExamenFetchAllQuery(query);

const destroyOne = () => {
  NotifyUtils.success('Registro eliminado correctamente.');
  refetch.value();
};
</script>
