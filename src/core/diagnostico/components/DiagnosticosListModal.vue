<template>
  <q-dialog v-model="open">
    <q-card style="width: 1200px; max-width: 80vw">
      <q-card-section>
        <q-item>
          <q-item-section avatar>
            <q-icon
              color="primary"
              name="fas fa-circle-exclamation"
              size="xl"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-h6"
              >Diagnosticos del Paciente</q-item-label
            >
            <q-item-label lines="2" class="text-subtitle2 text-italic">
              Por favor, seleccione un diagnostico para continuar.
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section>
        <diagnosticos-table
          :diagnosticos="diagnosticos"
          @select="(id) => $emit('select', id)"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { Diagnostico } from '../models';
import DiagnosticosTable from './DiagnosticosTable.vue';
const props = defineProps<{
  modelValue: boolean;
  diagnosticos: Diagnostico[];
}>();

const emit = defineEmits(['update:modelValue', 'submit', 'select']);
const open = useVModel(props, 'modelValue', emit);
</script>
