<template>
  <q-tab-panels v-model="panel" animated>
    <q-tab-panel name="mails">
      <div class="text-h6">Mails</div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </q-tab-panel>
    <q-tab-panel name="new">
      <orden-create-form />
    </q-tab-panel>
    <q-tab-panel name="movies">
      <div class="text-h6">Movies</div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import OrdenCreateForm from '../forms/OrdenCreateForm.vue';

const panel = ref('new');
</script>
