<template>
  <q-tab-panels v-if="paciente" v-model="panel" animated class="">
    <q-tab-panel name="list">
      <q-btn
        color="primary"
        icon="add"
        outline
        label="Nuevo"
        class="q-mb-md"
        @click="panel = 'new'"
      />
      <triajes-table
        :data="triajesDelPaciente"
        :loading="isTriajesLoading"
        @destroy-one="fetchTriajesDelPaciente(paciente.id)"
      />
    </q-tab-panel>

    <q-tab-panel name="new">
      <triaje-create-form
        :paciente-id="Number(paciente.id)"
        @cancel="panel = 'list'"
        @submit="onTriajeSubmit"
      />
      <!-- <triaje-create-formv2 :paciente-id="2" /> -->
    </q-tab-panel>

    <q-tab-panel name="edit"> editar </q-tab-panel>
  </q-tab-panels>
</template>

<script setup lang="ts">
import { useDiagnosticoFormStore } from 'core/diagnostico';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import TriajeCreateForm from '../forms/TriajeCreateForm.vue';
import TriajesTable from '../tables/TriajesTable.vue';
const { paciente, triajesDelPaciente, isTriajesLoading } = storeToRefs(
  useDiagnosticoFormStore()
);
const { fetchTriajesDelPaciente } = useDiagnosticoFormStore();

const panel = ref('list');

const onTriajeSubmit = async () => {
  if (paciente.value) {
    await fetchTriajesDelPaciente(paciente.value.id);
    panel.value = 'list';
  }
};
</script>
