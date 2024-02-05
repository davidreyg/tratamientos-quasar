<template>
  <q-table :columns="columns" :rows="controles" row-key="id" :loading="false">
    <template #top-right>
      <q-btn
        v-if="isDiagnosticoActive"
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
    <template #body-cell-actions="props">
      <q-td class="text-right">
        <q-card-actions align="center">
          <q-btn
            color="primary"
            icon="fas fa-eye"
            round
            size="sm"
            @click="$emit('viewControl', props.key)"
          />
          <q-btn
            v-if="isDiagnosticoActive"
            color="warning"
            icon="fas fa-pencil"
            round
            size="sm"
            @click="$emit('editControl', props.key)"
          />
          <q-btn
            v-if="isDiagnosticoActive"
            color="negative"
            icon="fas fa-trash-can"
            round
            size="sm"
            @click="deleteControl(props.key)"
          />
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
import { NotifyUtils, useLuxonFormat } from 'shared/utils';
import Swal from 'sweetalert2';
import { useControlDeleteMutation } from '../composables';
import { Control } from '../models';
defineProps({
  controles: {
    type: Array<Control>,
    required: true,
  },
  isDiagnosticoActive: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits<{
  (e: 'addControl'): void;
  (e: 'editControl', id: string): void;
  (e: 'deleteControl', id: string): void;
  (e: 'viewControl', id: string): void;
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
    name: 'observaciones',
    align: 'center',
    label: 'Observaciones',
    field: 'observaciones',
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
const { mutateAsync } = useControlDeleteMutation();
const deleteControl = (id: string) => {
  Swal.fire({
    title: '¿Está seguro de eliminar este registro?',
    text: 'No podra deshacer los cambios!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si',
    cancelButtonText: 'No',
    showLoaderOnConfirm: true,
    preConfirm: async () => {
      await mutateAsync(id, {
        onSuccess: async () => {
          NotifyUtils.success('Control eliminado correctamente.');
          emit('deleteControl', id);
        },
        onError: () => {
          Swal.hideLoading();
        },
      });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });
};
</script>
