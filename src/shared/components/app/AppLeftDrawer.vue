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
          <q-item :to="{ name: 'diagnosticos.index' }">
            <q-item-section avatar>
              <q-icon name="fas fa-file-lines" />
            </q-item-section>
            <q-item-section>Registrar Diagnóstico</q-item-section>
          </q-item>
        </q-expansion-item>
        <q-expansion-item
          clickable
          icon="fas fa-screwdriver-wrench"
          label="Mantenimiento"
        >
          <q-item :to="{ name: 'tipo-documentos.index' }">
            <q-item-section avatar>
              <q-icon name="fas fa-address-card" />
            </q-item-section>
            <q-item-section>Tipo de Documento</q-item-section>
          </q-item>
        </q-expansion-item>
        <q-expansion-item clickable icon="fas fa-chart-pie" label="Reportes">
          <q-item>
            ...en proceso
            <!-- <q-item-section avatar>
              <q-icon name="fab fa-500px" />
            </q-item-section>
            <q-item-section>Registrar Diagnóstico</q-item-section> -->
          </q-item>
        </q-expansion-item>
      </q-list>
    </q-scroll-area>
    <q-img class="absolute-top" src="/background.jpg" style="height: 150px">
      <div class="absolute-bottom bg-transparent">
        <q-avatar size="56px" class="q-mb-sm">
          <q-img src="/avatar/avatar-1.jpg" />
        </q-avatar>
        <div class="text-weight-bold">
          {{ user?.nombre_completo }}
        </div>
        <div>Cargo: {{ user?.cargo }}</div>
        <!-- <div>Establecimiento: {{ establecimiento?.nombre }}</div> -->
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
const { user } = storeToRefs(useAuthStore());
</script>
<style scoped>
.scroll-area {
  height: calc(100% - 150px);
  margin-top: 150px;
  border-right: 1px solid #ddd;
}
</style>
