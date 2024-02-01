<template>
  <q-layout view="hHh lpR fFf">
    <app-header @toggle-drawer="toggleLeftDrawer" />
    <app-left-drawer :left-drawer="leftDrawerOpen" />
    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition
          appear
          mode="in-out"
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          :duration="175"
        >
          <component :is="Component"></component>
        </transition>
      </router-view>
    </q-page-container>

    <!-- <app-footer /> -->
  </q-layout>
</template>

<script setup lang="ts">
// import AppFooter from '../components/app/AppFooter.vue';
import AppHeader from '../components/app/AppHeader.vue';
import AppLeftDrawer from '../components/app/AppLeftDrawer.vue';

import { ref } from 'vue';
const leftDrawerOpen = ref(true);
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
