<template>
  <q-drawer :model-value="leftDrawer" side="left" elevated>
    <!-- drawer content -->

    <q-scroll-area class="scroll-area">
      <!-- <q-list padding>
        <q-expansion-item
          v-for="(modulo, index) in modulos"
          :key="index"
          clickable
          :icon="modulo.icon"
          :label="modulo.name"
        >
          <q-item
            v-for="(item, i) in privileges?.filter(
              (p) => p.modulo_id === modulo.id
            )"
            :key="i"
            :to="item.route"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>{{ item.name }}</q-item-section>
          </q-item>
        </q-expansion-item>
      </q-list> -->
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
        <!-- <div>{{ person?.email }}</div> -->
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
