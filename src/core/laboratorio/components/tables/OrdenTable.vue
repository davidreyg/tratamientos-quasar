<template>
  <q-table :rows="ordens" :columns="columns" row-key="id">
    <template #body-cell-estado="props">
      <q-td :props="props">
        <q-badge
          :color="props.row.estado_detalle.color"
          :label="props.row.estado_detalle.label"
        />
      </q-td>
    </template>
    <template #body-cell-actions="props">
      <q-td :props="props" class="text-right">
        <q-card-actions align="right" class="q-pa-none q-ma-none">
          <slot
            :id="Number(props.key)"
            :estado="props.row.estado"
            name="actions"
          ></slot>
        </q-card-actions>
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { Orden } from 'core/laboratorio/models';
import { QTable } from 'quasar';
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
  },
  {
    name: 'actions',
    align: 'right',
    label: 'Acciones',
    field: 'actions',
  },
];
</script>
