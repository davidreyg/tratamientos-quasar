<template>
  <q-tab-panels v-model="panel" animated class="">
    <q-tab-panel name="list"> list </q-tab-panel>

    <q-tab-panel name="new">
      <triaje-create-form :paciente-id="2" />
      <!-- <triaje-create-formv2 :paciente-id="2" /> -->
    </q-tab-panel>

    <q-tab-panel name="edit"> editar </q-tab-panel>
  </q-tab-panels>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TriajeCreateForm from '../forms/TriajeCreateForm.vue';

const panel = ref('new');
</script>
