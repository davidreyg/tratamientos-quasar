<template>
  <q-drawer :model-value="leftDrawer" side="left" elevated>
    <!-- drawer content -->

    <q-scroll-area class="scroll-area">
      <q-list padding>
        <q-expansion-item
          v-for="privilegio in privilegiosPadre"
          :key="privilegio.id"
          clickable
          :icon="privilegio.icono"
          :label="privilegio.nombre"
        >
          <q-item
            v-for="item in privilegios.filter(
              (p) => p.parent_id == privilegio.id
            )"
            :key="item.id"
            :to="item.ruta"
            exact
          >
            <q-item-section avatar>
              <q-icon :name="item.icono" />
            </q-item-section>
            <q-item-section>{{ item.nombre }} </q-item-section>
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
const { user, privilegiosPadre, privilegios } = storeToRefs(useAuthStore());
</script>
<style scoped>
.scroll-area {
  height: calc(100% - 150px);
  margin-top: 150px;
  border-right: 1px solid #ddd;
}
</style>
