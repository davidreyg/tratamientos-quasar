<template>
  <div class="row q-col-gutter-md">
    <div class="col-12">
      <q-tab-panels v-model="panel" animated>
        <q-tab-panel name="list">
          <orden-table v-if="data" :ordens="data.data">
            <template #custom-actions="{ props }">
              <q-btn
                color="primary"
                icon="fas fa-file-signature"
                round
                flat
                size="sm"
                :loading="isOrdenLoading && selectedID === Number(props.key)"
                @click="buscarOrdenPorId(Number(props.key))"
              >
                <q-tooltip>Editar resultados.</q-tooltip>
              </q-btn>
              <q-btn
                v-if="props.row.estado === 0"
                color="info"
                icon="fas fa-check-double"
                round
                flat
                size="sm"
                :loading="
                  isRegistrarLoading && selectedID === Number(props.key)
                "
                @click="registrarOrden(Number(props.key))"
              >
                <q-tooltip>Confirmar registro.</q-tooltip>
              </q-btn>
            </template>
          </orden-table>
        </q-tab-panel>
        <q-tab-panel name="edit-examens">
          <q-expansion-item
            v-if="ordenSeleccionada"
            icon="fas fa-file-signature"
            label="Datos de la orden."
          >
            <q-card class="my-card">
              <q-card-section>
                <orden-datos-form :orden="ordenSeleccionada" />
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <q-expansion-item
            v-if="ordenSeleccionada"
            icon="fas fa-vials"
            label="Registrar resultados."
            caption="Editar / Crear"
            default-opened
          >
            <q-card class="my-card">
              <q-card-section>
                <registrar-resultados-form
                  :orden="ordenSeleccionada"
                  @cancel="onOrdenCancel"
                  @submit="onOrdenCancel"
                />
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { NotifyUtils, Query } from 'shared/utils';
import Swal from 'sweetalert2';
import { ref, watch } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import OrdenDatosForm from '../components/forms/OrdenDatosForm.vue';
import RegistrarResultadosForm from '../components/forms/RegistrarResultadosForm.vue';
import OrdenTable from '../components/tables/OrdenTable.vue';
import {
  useOrdenFetchAllQuery,
  useOrdenRegistrarMutation,
} from '../composables';
import { useLaboratorioFormStore } from '../stores';
const { $reset, fetchOrdenById } = useLaboratorioFormStore();
const { ordenSeleccionada, isOrdenLoading } = storeToRefs(
  useLaboratorioFormStore()
);
const query = ref<Query>({
  search: 'estado:0',
  searchJoin: 'and',
  limit: 0,
});
const selectedID = ref<number>();
const { data, refetch } = useOrdenFetchAllQuery(query);

const panel = ref('list');

const buscarOrdenPorId = async (id: number) => {
  selectedID.value = id;
  await fetchOrdenById(id);
  if (ordenSeleccionada.value) {
    panel.value = 'edit-examens';
  }
};
const { mutateAsync, isLoading: isRegistrarLoading } =
  useOrdenRegistrarMutation();
const registrarOrden = async (id: number) => {
  selectedID.value = id;

  Swal.fire({
    title: '¿Está seguro de culminar el REGISTRO de los resultados?',
    text: 'No podra deshacer los cambios!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si',
    cancelButtonText: 'No',
    showLoaderOnConfirm: true,
    preConfirm: async () => {
      await mutateAsync(id, {
        onSuccess: async () => {
          NotifyUtils.success('La orden se VERIFICO correctamente.');
          refetch.value();
          panel.value = 'list';
        },
        onError: () => {
          Swal.hideLoading();
        },
      });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });
};

const onOrdenCancel = () => {
  ordenSeleccionada.value = undefined;
};

onBeforeRouteLeave(() => {
  $reset();
});

watch(
  () => ordenSeleccionada.value,
  (newValue) => {
    if (!newValue) panel.value = 'list';
  }
);
</script>
