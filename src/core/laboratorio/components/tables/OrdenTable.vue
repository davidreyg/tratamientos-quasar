<template>
  <base-table
    :data="ordens"
    :columns="columns"
    :loading="loading"
    row-key="id"
    :server-pagination="serverPagination"
    @request="(req) => $emit('request', req)"
  >
    <template #top><slot name="top"></slot></template>
    <template #body-cell-estado="{ props }">
      <q-td :props="props">
        <q-badge
          :color="props.row.estado_detalle.color"
          :label="props.row.estado_detalle.label"
        />
      </q-td>
    </template>
    <template #customActions="{ props }">
      <slot name="custom-actions" :props="props"></slot>
    </template>
  </base-table>
</template>

<script setup lang="ts">
import { Orden } from 'core/laboratorio/models';
import { QTable } from 'quasar';
import BaseTable from 'shared/components/base/BaseTable.vue';
import {
  OnRequestParameter,
  ServerPagination,
  useLuxonFormat,
} from 'shared/utils';
import { PropType } from 'vue';
const { formatDate } = useLuxonFormat();
defineProps({
  ordens: {
    type: Array<Orden>,
    required: true,
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
  serverPagination: {
    type: Object as PropType<ServerPagination>,
    default: undefined,
  },
});

defineEmits<{
  request: [req: OnRequestParameter];
}>();
const columns: QTable['columns'] = [
  {
    name: 'index',
    label: '#',
    field: 'index',
  },
  {
    name: 'fecha_registro',
    align: 'left',
    label: 'Fecha Registro',
    field: 'fecha_registro',
    format: (val: string) => formatDate(val),
  },
  {
    name: 'medico',
    align: 'center',
    label: 'Medico',
    field: 'medico',
  },
  {
    name: 'diagnostico',
    align: 'center',
    label: 'Diagnostico',
    field: 'diagnostico',
  },
  {
    name: 'nombre_completo',
    align: 'center',
    label: 'Paciente',
    field: (row) => row.paciente.data.nombre_completo,
  },
  {
    name: 'documento',
    align: 'center',
    label: 'N° Documento',
    field: (row) => row.paciente.data.numero_documento,
  },
  {
    name: 'codigo_atencion',
    align: 'center',
    label: 'Codigo Atención',
    field: 'codigo_atencion',
  },
  {
    name: 'estado',
    align: 'center',
    label: 'Estado',
    field: 'estado',
    sortable: true,
  },
  {
    name: 'actions',
    align: 'right',
    label: 'Acciones',
    field: 'actions',
  },
];
</script>
