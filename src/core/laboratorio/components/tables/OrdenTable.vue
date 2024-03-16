<template>
  <base-table :data="ordens" :columns="columns" row-key="id">
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
import { useLuxonFormat } from 'shared/utils';
const { formatDate } = useLuxonFormat();
defineProps({
  ordens: {
    type: Array<Orden>,
    required: true,
  },
});
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
    name: 'paciente',
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
