<template>
  <div class="row">
    <div class="col-xs-7 col-sm-4 col-md-2">
      <slot name="avatar">
        <LottieAnimation
          ref="anim"
          :animation-data="EmptyAnimation"
          :auto-play="true"
          :loop="true"
          :speed="1"
        />
      </slot>
    </div>
    <div class="col-12 text-center text-h6">¡Aún no hay registros!</div>
    <div class="col-12 text-center text-subtitle1">
      Esta sección contendrá la información de tus registros...
    </div>
    <q-btn
      class="q-mt-lg"
      color="primary"
      icon="fas fa-plus"
      no-caps
      label="Agregar nuevo registro"
      outline
      @click="$emit('add')"
    />
  </div>
</template>

<script setup lang="ts">
import { LottieAnimation } from 'lottie-web-vue';
import EmptyAnimation from 'src/assets/empty.json';
defineEmits<{
  add: [];
}>();
</script>
