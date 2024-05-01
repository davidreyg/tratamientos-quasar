<template>
  <item-table
    :data="data || []"
    :loading="isFetching"
    @edit="(id:number)=> $router.push({name:'items.edit',params:{id}})"
    @destroy-one="destroyOne"
  />
</template>

<script setup lang="ts">
import { NotifyUtils, Query } from 'shared/utils';
import { ref } from 'vue';
import ItemTable from '../components/tables/ItemTable.vue';
import { useItemFetchAllQuery } from '../composables';

const query = ref<Query>({
  limit: 0,
  // search: 'is_active:1',
  searchJoin: 'and',
});
const { data, isFetching, refetch } = useItemFetchAllQuery(query);

const destroyOne = () => {
  NotifyUtils.success('Registro eliminado correctamente.');
  refetch.value();
};
</script>
