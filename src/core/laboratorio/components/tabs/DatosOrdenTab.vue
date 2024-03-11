<template>
  <q-tab-panels v-if="paciente" v-model="panel" animated>
    <q-tab-panel name="mails">
      <div class="text-h6">Mails</div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </q-tab-panel>
    <q-tab-panel name="new">
      <orden-create-form :paciente-id="Number(paciente.id)" />
    </q-tab-panel>
    <q-tab-panel name="movies">
      <div class="text-h6">Movies</div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup lang="ts">
import { Paciente } from 'core/paciente';
import { PropType, ref } from 'vue';
import OrdenCreateForm from '../forms/OrdenCreateForm.vue';
defineProps({
  paciente: {
    type: Object as PropType<Paciente>,
    required: true,
  },
});
const panel = ref('new');
</script>
