<template>
  <q-table :columns="columns" :rows="controles" row-key="id" :loading="false">
    <template #top-right>
      <q-btn
        flat
        color="primary"
        icon="fas fa-folder-plus"
        label="Nuevo"
        no-caps
        @click="$emit('addControl')"
      />
    </template>

    <template #body-cell-control="props">
      <q-td class="text-left text-bold">
        Control {{ props.rowIndex + 1 }}
      </q-td>
    </template>
    <template #body-cell-actions="">
      <q-td class="text-right">
        <q-card-actions align="center">
          <q-btn color="warning" icon="fas fa-pencil" round size="sm" />
          <q-btn color="negative" icon="fas fa-trash-can" round size="sm" />
        </q-card-actions>
      </q-td>
    </template>
    <template #body-cell-medicamentos="props">
      <q-td class="text-left">
        <ul>
          <li v-for="(medicamento, index) in props.value" :key="index">
            {{ medicamento }}
          </li>
        </ul>
      </q-td>
    </template>
    <template #body-cell-complicaciones="props">
      <q-td class="text-left">
        <ul>
          <li v-for="(complicacion, index) in props.value" :key="index">
            {{ complicacion }}
          </li>
        </ul>
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { QTable } from 'quasar';
import { useLuxonFormat } from 'shared/utils';
import { Control } from '../models';
defineProps({
  controles: {
    type: Array<Control>,
    required: true,
  },
});
defineEmits<{
  (e: 'select', id: string): void;
  (e: 'addControl'): void;
}>();
const { formatDate } = useLuxonFormat();
const columns: QTable['columns'] = [
  {
    name: 'control',
    align: 'left',
    label: 'N°',
    field: 'control',
  },
  {
    name: 'medicamentos',
    align: 'left',
    label: 'Tratamiento',
    field: (row) => {
      // let xd = '';
      return row.medicamentos.data.map(
        (value: { nombre: string }) => value.nombre
      );
    },
  },
  {
    name: 'complicaciones',
    align: 'left',
    label: 'Complicacion',
    field: (row) => {
      // let xd = '';
      return row.complicaciones.data.map(
        (value: { nombre: string }) => value.nombre
      );
    },
  },
  {
    name: 'fecha_inicio',
    align: 'center',
    label: 'Fecha Inicio',
    field: 'fecha_inicio',
    format: (val: string) => formatDate(val),
  },

  {
    name: 'fecha_fin',
    align: 'center',
    label: 'Fecha Fin',
    field: 'fecha_fin',
    format: (val: string) => formatDate(val),
  },
  // {
  //   name: 'observaciones',
  //   align: 'center',
  //   label: 'Observaciones',
  //   field: 'observaciones',
  // },
  {
    name: 'medico',
    align: 'center',
    label: 'Medico',
    field: (row) => {
      // let xd = '';
      return (
        row.medico.data.nombres +
        ' ' +
        row.medico.data.apellido_paterno +
        ' ' +
        row.medico.data.apellido_materno
      );
    },
  },
  {
    name: 'actions',
    align: 'right',
    label: 'Acciones',
    field: 'actions',
  },
];
</script>
