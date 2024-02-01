<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar style="padding: 0">
      <q-btn
        class="q-ml-sm"
        dense
        flat
        round
        icon="fas fa-bars"
        @click="emit('toggleDrawer')"
      />

      <q-toolbar-title>
        <q-avatar>
          <q-img src="/icons/favicon-128x128.png" />
        </q-avatar>
        Apiato Frontend
      </q-toolbar-title>

      <q-btn round class="q-mr-sm">
        <q-avatar size="42px">
          <q-img src="/avatar/avatar-1.jpg" />
        </q-avatar>
        <q-menu fit transition-show="flip-right" transition-hide="jump-up">
          <q-card class="my-card" flat>
            <q-card-section>
              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <q-img src="/avatar/avatar-1.jpg" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>
                    {{ `${user?.name}` }}
                  </q-item-label>
                  <q-item-label caption>
                    {{ roles![0].display_name }}
                  </q-item-label>
                  <q-item-label caption>
                    RIS: {{ establecimiento?.ris }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
            <q-separator />
            <q-list style="min-width: 100px">
              <q-item clickable :to="{ name: 'profile' }">
                <q-item-section avatar>
                  <q-icon name="fas fa-user-gear" />
                </q-item-section>
                <q-item-section>Ver Perfil</q-item-section>
              </q-item>
              <q-separator />
              <q-item v-close-popup clickable @click="logout">
                <q-item-section avatar>
                  <q-icon name="fas fa-arrow-right-from-bracket" />
                </q-item-section>
                <q-item-section>Cerrar Sesión</q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>
<script setup lang="ts">
import { LogoutAction } from 'core/auth/actions/LogoutAction';
import { useAuthStore } from 'core/auth/stores';
import { storeToRefs } from 'pinia';
const emit = defineEmits<{
  (e: 'toggleDrawer'): void;
}>();
const { roles, user, establecimiento } = storeToRefs(useAuthStore());
const logout = async () => {
  await LogoutAction.run();
};
</script>
