<template>
  <q-page padding>
    <div class="row justify-between q-mb-lg">
      <div class="col-8 text-h5 text-bold">{{ title }}</div>
      <!-- //FIXME: Slot not used... -->
      <div class="col-auto">
        <q-card-actions align="right">
          <q-btn
            v-if="withAdd"
            color="primary"
            label="Nuevo"
            icon-right="fas fa-file-circle-plus"
            no-caps
            outline
            @click="$emit('add')"
          />
          <slot name="top-right"> </slot>
        </q-card-actions>
      </div>
    </div>
    <slot name="content">Contenido</slot>
    <q-inner-loading :showing="loading">
      <q-spinner-gears size="100px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
  withAdd: {
    type: Boolean,
    default: false,
  },
});

defineEmits<{
  (e: 'add'): void;
}>();
</script>
