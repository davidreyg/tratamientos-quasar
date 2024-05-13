<template>
  <q-dialog v-model="open">
    <q-card style="width: 1000px; max-width: 90vw">
      <q-card-section>
        <iframe v-if="pdfUrl" :src="pdfUrl" width="100%" height="500px" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
const props = defineProps<{
  modelValue: boolean;
  pdfUrl: string;
}>();

const emit = defineEmits(['update:modelValue']);
const open = useVModel(props, 'modelValue', emit);
</script>
