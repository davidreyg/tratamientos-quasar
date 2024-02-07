<template>
  <q-table
    :columns="columns"
    :rows="diagnosticos"
    row-key="id"
    :loading="false"
  >
    <template #header="props">
      <q-tr :props="props">
        <q-th auto-width />
        <q-th v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>
    <template #body="props">
      <q-tr :props="props">
        <q-td auto-width>
          <q-btn
            size="sm"
            color="accent"
            round
            dense
            :icon="props.expand ? 'remove' : 'add'"
            @click="props.expand = !props.expand"
          />
        </q-td>
        <q-td
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
          auto-width
        >
          <q-btn
            v-if="col.name === 'actions'"
            flat
            color="primary"
            icon="fas fa-check"
            round
            padding="0"
            @click="$emit('select', props.key)"
          />
          <q-badge
            v-else-if="col.name === 'estado'"
            :color="col.value ? 'positive' : 'negative'"
            rounded
            class="q-mr-sm"
            :label="col.value ? 'Activo' : 'Inactivo'"
          />
          <ul v-else-if="col.name === 'enfermedades'">
            <li v-for="(enfermedad, index) in col.value" :key="index">
              {{ enfermedad }}
            </li>
          </ul>
          <div v-else>{{ col.value }}</div>
        </q-td>
      </q-tr>
      <q-tr v-show="props.expand" :props="props">
        <q-td colspan="100%">
          <div class="row">
            <div class="col-xs-12 col-sm-6">
              <q-list dense>
                <q-item>
                  <q-item-section>Establecimiento:</q-item-section>
                  <q-item-section side>
                    {{ props.row.establecimiento.data.nombre }}
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>Observaciones:</q-item-section>
                  <q-item-section side>
                    {{ props.row.motivo_finalizacion }}
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </q-td>
      </q-tr>
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
    name: 'fecha',
    align: 'center',
    label: 'Fecha',
    field: 'created_at',
    format: (val: string) => formatDate(val),
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
    name: 'Descripcion',
    align: 'center',
    label: 'Descripcion',
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
