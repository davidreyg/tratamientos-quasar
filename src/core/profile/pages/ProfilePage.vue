<template>
  <base-page title="Editar Perfil" :loading="false">
    <template #content>
      <q-splitter v-model="splitterModel">
        <template #before>
          <q-tabs v-model="tab" vertical class="text-primary">
            <q-tab
              no-caps
              name="user-data"
              icon="fas fa-user-gear"
              :label="$q.screen.gt.sm ? 'Datos del Usuario' : undefined"
            />
            <!-- <q-tab
              no-caps
              name="personal-data"
              icon="fas fa-file-lines"
              :label="$q.screen.gt.sm ? 'Datos Personales' : undefined"
            /> -->
            <!-- <q-tab
              no-caps
              name="gol-data"
              icon="fas fa-people-roof"
              :label="$q.screen.gt.sm ? 'Gol' : undefined"
            /> -->
          </q-tabs>
        </template>

        <template #after>
          <q-tab-panels
            v-model="tab"
            animated
            vertical
            transition-prev="jump-up"
            transition-next="jump-up"
            no-caps
          >
            <q-tab-panel name="user-data">
              <user-information-tab />
            </q-tab-panel>
            <!-- <q-tab-panel name="personal-data">
              <personal-information-tab />
            </q-tab-panel> -->
          </q-tab-panels>
        </template>
      </q-splitter>
    </template>
  </base-page>
</template>

<script setup lang="ts">
import BasePage from 'shared/components/base/BasePage.vue';
import { ref } from 'vue';
import UserInformationTab from '../components/tabs/UserInformationTab.vue';
const tab = ref('user-data');
const splitterModel = ref(17);
</script>
