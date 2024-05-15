<template>
  <q-item v-close-popup clickable @click="$emit('edit', id)">
    <q-item-section avatar>
      <q-icon name="fas fa-pen-to-square" color="warning" />
    </q-item-section>
    <q-item-section>Editar</q-item-section>
  </q-item>
  <q-separator />
  <q-item v-close-popup clickable @click="$emit('destroy', id)">
    <q-item-section avatar>
      <q-icon name="fas fa-trash-can" color="negative" />
    </q-item-section>
    <q-item-section>Eliminar</q-item-section>
  </q-item>
</template>

<script setup lang="ts">
defineProps({
  id: {
    type: String,
    required: true,
  },
});
defineEmits<{
  destroy: [key: string];
  edit: [key: string];
}>();
</script>
