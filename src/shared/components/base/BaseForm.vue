<template>
  <q-form @submit="$emit('submit')">
    <div class="col-12 row q-col-gutter-md">
      <slot></slot>
    </div>
    <slot name="actions">
      <q-card-actions class="col-12 justify-end q-pa-none q-pt-md">
        <q-btn
          label="Cancelar"
          color="primary"
          no-caps
          outline
          @click="$emit('cancel')"
        />
        <q-btn
          label="Guardar"
          type="submit"
          icon="fas fa-floppy-disk"
          color="primary"
          no-caps
          :loading="loading"
        />
      </q-card-actions>
    </slot>
  </q-form>
</template>

<script setup lang="ts">
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});
defineEmits<{
  (e: 'submit'): void;
  (e: 'cancel'): void;
}>();
</script>
