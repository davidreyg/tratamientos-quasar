<template>
  <q-drawer :model-value="leftDrawer" side="left" elevated>
    <!-- drawer content -->

    <q-scroll-area class="scroll-area">
      <q-list padding>
        <q-expansion-item
          clickable
          icon="fab fa-apple"
          label="Gestión de Diagnosticos"
        >
          <q-item>
            <q-item-section avatar>
              <q-icon name="fab fa-500px" />
            </q-item-section>
            <q-item-section>Registrar Diagnóstico</q-item-section>
          </q-item>
        </q-expansion-item>
      </q-list>
    </q-scroll-area>
    <q-img
      class="absolute-top"
      src="https://cdn.quasar.dev/img/material.png"
      style="height: 150px"
    >
      <div class="absolute-bottom bg-transparent">
        <q-avatar size="56px" class="q-mb-sm">
          <q-img src="/avatar/avatar-1.jpg" />
        </q-avatar>
        <div class="text-weight-bold">
          {{ user?.name }}
        </div>
        <div>Establecimiento: {{ establecimiento?.nombre }}</div>
        <div>RIS: {{ establecimiento?.ris }}</div>
      </div>
    </q-img>
  </q-drawer>
</template>
<script setup lang="ts">
import { useAuthStore } from 'core/auth/stores';
import { storeToRefs } from 'pinia';

defineProps({
  leftDrawer: { required: true, type: Boolean },
});
const { user, establecimiento } = storeToRefs(useAuthStore());
</script>
<style scoped>
.scroll-area {
  height: calc(100% - 150px);
  margin-top: 150px;
  border-right: 1px solid #ddd;
}
</style>
