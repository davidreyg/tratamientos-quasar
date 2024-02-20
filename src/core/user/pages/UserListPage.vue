<template>
  <users-table
    v-if="isSuccess && data"
    :data="data.data"
    :loading="isFetching"
    :server-pagination="data.meta.pagination"
    @edit="(id:string)=> $router.push({name:'empleados.edit',params:{id}})"
    @destroy-one="destroyOne"
    @request="handleRequest"
  />
</template>

<script setup lang="ts">
import { NotifyUtils, OnRequestParameter, Query } from 'shared/utils';
import { ref } from 'vue';
import UsersTable from '../components/tables/UsersTable.vue';
import { useUserFetchAllQuery } from '../composables';

const query = ref<Query>({ page: 1 });
const { data, isFetching, isSuccess, refetch } = useUserFetchAllQuery(query);

const destroyOne = () => {
  NotifyUtils.success('Registro eliminado correctamente.');
  refetch.value();
};

const handleRequest = (req: OnRequestParameter) => {
  query.value.page = req.pagination.page;
  query.value.limit = req.pagination.rowsPerPage;
  query.value.search = req.filter;
  query.value.orderBy = req.pagination.sortBy;
  query.value.sortedBy = req.pagination.descending ? 'desc' : 'asc';
};
</script>
