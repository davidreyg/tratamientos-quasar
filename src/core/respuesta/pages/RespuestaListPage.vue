<template>
  <respuesta-table
    :data="data || []"
    :loading="isFetching"
    @edit="(id:number)=> $router.push({name:'respuestas.edit',params:{id}})"
    @destroy-one="destroyOne"
  />
</template>

<script setup lang="ts">
import { NotifyUtils } from 'shared/utils';
import RespuestaTable from '../components/tables/RespuestaTable.vue';
import { useRespuestaFetchAllQuery } from '../composables';

const { data, isFetching, refetch } = useRespuestaFetchAllQuery();

const destroyOne = () => {
  NotifyUtils.success('Registro eliminado correctamente.');
  refetch.value();
};
</script>
