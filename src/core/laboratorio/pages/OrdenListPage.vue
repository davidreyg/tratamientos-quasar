<template>
  <div class="row q-col-gutter-md">
    <div class="col-12">
      <q-tab-panels v-model="panel" animated>
        <q-tab-panel name="list">
          <orden-table
            v-if="data"
            :ordens="data.data"
            :server-pagination="data.meta.pagination"
            :loading="isFetching"
            @request="handleRequest"
          >
            <!-- <template #top>
              <filtro-orden-form @submit="onFiltrarOrden" />
            </template> -->
            <template #custom-actions="{ props }">
              <q-btn
                color="primary"
                icon="fas fa-eye"
                round
                flat
                size="sm"
                :loading="isOrdenLoading && selectedID === Number(props.key)"
              >
                <q-tooltip>Visualizar Orden.</q-tooltip>
              </q-btn>
              <q-btn
                v-if="props.row.estado === 2"
                color="info"
                icon="fas fa-print"
                round
                flat
                size="sm"
              >
                <q-tooltip>Imprimir.</q-tooltip>
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
                  with-observaciones
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
import { OnRequestParameter, Query } from 'shared/utils';
import { ref, watch } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import OrdenDatosForm from '../components/forms/OrdenDatosForm.vue';
import RegistrarResultadosForm from '../components/forms/RegistrarResultadosForm.vue';
import OrdenTable from '../components/tables/OrdenTable.vue';
import { useOrdenFetchAllQuery } from '../composables';
import { useLaboratorioFormStore } from '../stores';
const { $reset } = useLaboratorioFormStore();
const { ordenSeleccionada, isOrdenLoading } = storeToRefs(
  useLaboratorioFormStore()
);
const query = ref<Query>({});
const selectedID = ref<number>();
const { data, isFetching } = useOrdenFetchAllQuery(query);
const panel = ref('list');

const handleRequest = (req: OnRequestParameter) => {
  query.value.page = req.pagination.page;
  query.value.limit = req.pagination.rowsPerPage;
  query.value.search = req.filter;
  query.value.orderBy = req.pagination.sortBy;
  query.value.sortedBy = req.pagination.descending ? 'desc' : 'asc';
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
