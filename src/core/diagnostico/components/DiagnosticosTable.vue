<template>
  <q-table
    :columns="columns"
    :rows="diagnosticos"
    row-key="id"
    :loading="false"
  >
    <template #body-cell-actions="props">
      <q-td class="text-right">
        <q-btn
          flat
          color="primary"
          icon="fas fa-check"
          round
          padding="0"
          @click="$emit('select', props.key)"
        />
      </q-td>
    </template>
    <template #body-cell-enfermedades="props">
      <q-td class="text-left">
        <ul>
          <li v-for="(enfermedad, index) in props.value" :key="index">
            {{ enfermedad }}
          </li>
        </ul>
      </q-td>
    </template>
    <template #body-cell-estado="props">
      <q-td class="text-center">
        <q-badge
          :color="props.value ? 'positive' : 'negative'"
          rounded
          class="q-mr-sm"
          :label="props.value ? 'Activo' : 'Inactivo'"
        />
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { QTable } from 'quasar';
import { useLuxonFormat } from 'shared/utils';
import { Diagnostico } from '../models';
defineProps({
  diagnosticos: {
    type: Array<Diagnostico>,
    required: true,
  },
});
defineEmits<{
  (e: 'select', id: string): void;
}>();
const { formatDate } = useLuxonFormat();
const columns: QTable['columns'] = [
  {
    name: 'establecimiento',
    align: 'left',
    label: 'Establecimiento',
    field: (row) => row.establecimiento.data.nombre,
  },
  {
    name: 'enfermedades',
    align: 'left',
    label: 'Enfermedades',
    field: (row) => {
      return row.enfermedades.data.map(
        (value: { nombre: string }) => value.nombre
      );
    },
  },
  {
    name: 'fecha',
    align: 'center',
    label: 'Fecha',
    field: 'created_at',
    format: (val: string) => formatDate(val),
  },
  {
    name: 'observaciones',
    align: 'center',
    label: 'Observaciones',
    field: 'observaciones',
  },
  {
    name: 'estado',
    align: 'center',
    label: 'Estado',
    field: 'estado',
  },
  {
    name: 'actions',
    align: 'center',
    label: 'Acciones',
    field: 'actions',
  },
];
</script>
