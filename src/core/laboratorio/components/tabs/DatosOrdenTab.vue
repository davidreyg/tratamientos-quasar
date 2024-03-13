<template>
  <q-tab-panels v-if="paciente" v-model="panel" animated>
    <q-tab-panel name="list">
      <div
        v-if="data && data.data.length === 0"
        class="col-12 row justify-center"
      >
        <div class="col-auto">
          <q-icon name="fas fa-face-frown" size="xl" />
        </div>
        <div class="col-12 text-center text-h6">
          Lo sentimos. ¡No se encontró ninguna orden!. Porfavor registre uno
          para empezar.
        </div>
        <q-btn
          class="q-mt-lg"
          color="primary"
          icon="fas fa-plus"
          no-caps
          label="Registrar nueva orden"
          outline
          to="/laboratorio/registrar-orden"
        />
      </div>
      <div v-else-if="data">
        <orden-table :ordens="data.data">
          <template #actions="{ id, estado }">
            <q-btn
              color="primary"
              icon="fas fa-file-signature"
              round
              flat
              size="sm"
              @click="buscarOrdenPorId(id)"
            >
              <q-tooltip>Registrar resultados.</q-tooltip>
            </q-btn>
            <q-btn
              v-if="estado === 0"
              color="positive"
              icon="fas fa-check-double"
              round
              flat
              size="sm"
            >
              <q-tooltip>Confirmar registro.</q-tooltip>
            </q-btn>
          </template>
        </orden-table>
      </div>
    </q-tab-panel>
    <q-tab-panel name="new">
      <orden-create-form :paciente-id="Number(paciente.id)" />
    </q-tab-panel>
    <q-tab-panel name="view">
      <orden-datos-form
        v-if="ordenSeleccionada"
        :orden="ordenSeleccionada"
        @cancel="onOrdenCancel"
      />
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup lang="ts">
import { useOrdenFetchAllQuery } from 'core/laboratorio/composables';
import { useLaboratorioFormStore } from 'core/laboratorio/stores';
import { Paciente } from 'core/paciente';
import { storeToRefs } from 'pinia';
import { Query } from 'shared/utils';
import { PropType, ref } from 'vue';
import OrdenCreateForm from '../forms/OrdenCreateForm.vue';
import OrdenDatosForm from '../forms/OrdenDatosForm.vue';
import OrdenTable from '../tables/OrdenTable.vue';
const props = defineProps({
  paciente: {
    type: Object as PropType<Paciente>,
    required: true,
  },
});

const { ordenSeleccionada } = storeToRefs(useLaboratorioFormStore());
const { fetchOrdenById } = useLaboratorioFormStore();

const query = ref<Query>({
  search: `paciente_id:${props.paciente.id};estado:0,1`,
  searchJoin: 'and',
  limit: 0,
});
const { data } = useOrdenFetchAllQuery(query);
const panel = ref('list');

const buscarOrdenPorId = async (id: number) => {
  await fetchOrdenById(id);
  if (ordenSeleccionada.value) {
    panel.value = 'view';
  }
};

const onOrdenCancel = () => {
  ordenSeleccionada.value = undefined;
  panel.value = 'list';
};
</script>
