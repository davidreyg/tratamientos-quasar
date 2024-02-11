<template>
  <base-page :title="$route.meta.title" :loading="false">
    <template #top-right>
      <!-- <q-btn
        v-if="$route.meta.action === 'new'"
        color="primary"
        label="Nuevo"
        icon-right="fas fa-file-circle-plus"
        no-caps
        outline
        @click="$router.push({ name: 'roles.create' })"
      /> -->
      <q-btn
        v-if="$route.meta.action === 'back'"
        color="primary"
        label="Atrás"
        icon-right="fas fa-arrow-left"
        no-caps
        outline
        @click="$router.back()"
      />
    </template>
    <template #content>
      <router-view v-slot="{ Component }">
        <transition
          mode="out-in"
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          :duration="150"
        >
          <component :is="Component" :key="$route.fullPath"></component>
        </transition>
      </router-view>
    </template>
  </base-page>
</template>

<script setup>
import BasePage from 'shared/components/base/BasePage.vue';
</script>
