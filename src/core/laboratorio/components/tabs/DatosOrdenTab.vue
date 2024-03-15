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
              :loading="isOrdenLoading && selectedID === id"
              @click="buscarOrdenPorId(id)"
            >
              <q-tooltip>Editar resultados.</q-tooltip>
            </q-btn>
            <q-btn
              v-if="estado === 0"
              color="positive"
              icon="fas fa-check-double"
              round
              flat
              size="sm"
              :loading="isRegistrarLoading && selectedID === id"
              @click="updateEstado(id, 1)"
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
import {
  useOrdenFetchAllQuery,
  useOrdenUpdateEstadoMutation,
} from 'core/laboratorio/composables';
import { useLaboratorioFormStore } from 'core/laboratorio/stores';
import { Paciente } from 'core/paciente';
import { storeToRefs } from 'pinia';
import { NotifyUtils, Query } from 'shared/utils';
import { PropType, ref, watch } from 'vue';
import OrdenCreateForm from '../forms/OrdenCreateForm.vue';
import OrdenDatosForm from '../forms/OrdenDatosForm.vue';
import OrdenTable from '../tables/OrdenTable.vue';
const props = defineProps({
  paciente: {
    type: Object as PropType<Paciente>,
    required: true,
  },
});

const { ordenSeleccionada, isOrdenLoading } = storeToRefs(
  useLaboratorioFormStore()
);
const { fetchOrdenById } = useLaboratorioFormStore();

const query = ref<Query>({
  search: `paciente_id:${props.paciente.id};estado:0,1`,
  searchJoin: 'and',
  limit: 0,
});
const { data, refetch } = useOrdenFetchAllQuery(query);
const panel = ref('list');
const selectedID = ref<number>();

const buscarOrdenPorId = async (id: number) => {
  selectedID.value = id;
  await fetchOrdenById(id);
  if (ordenSeleccionada.value) {
    panel.value = 'view';
  }
};
const { mutateAsync, isLoading: isRegistrarLoading } =
  useOrdenUpdateEstadoMutation();
const updateEstado = async (id: number, estado: number) => {
  selectedID.value = id;
  await mutateAsync(
    { id, data: { estado } },
    {
      onSuccess: () => {
        NotifyUtils.success('La orden se REGISTRO correctamente.');
        refetch.value();
        panel.value = 'list';
      },
      onError: (err) => {
        console.log(err);
        // setErrors(err.data.errors);
      },
    }
  );
};

const onOrdenCancel = () => {
  ordenSeleccionada.value = undefined;
  // panel.value = 'list';
};

watch(
  () => ordenSeleccionada.value,
  (newValue) => {
    if (!newValue) panel.value = 'list';
  }
);
</script>
