<template>
  <div class="row q-col-gutter-md">
    <!-- <pre class="col-12">{{ orden }}</pre> -->
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
                v-if="props.row.estado === 0"
                color="warning"
                icon="fas fa-edit"
                round
                flat
                size="sm"
                :loading="
                  accion === 'edit' &&
                  isOrdenFetching &&
                  selectedID === Number(props.key)
                "
                @click="editarOrden(Number(props.key))"
              >
                <q-tooltip>Editar Orden.</q-tooltip>
              </q-btn>
              <q-btn
                color="primary"
                icon="fas fa-eye"
                round
                flat
                size="sm"
                :loading="
                  accion === 'view' &&
                  isOrdenFetching &&
                  selectedID === Number(props.key)
                "
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
        <q-tab-panel name="edit-orden">
          <!-- <q-expansion-item
            v-if="ordenSeleccionada"
            icon="fas fa-file-signature"
            label="Datos de la orden."
          > -->
          <q-card class="my-card">
            <q-card-section>
              <orden-edit-form
                v-if="ordenSeleccionada"
                :orden="ordenSeleccionada"
                @submit="onOrdenCancel"
                @cancel="onOrdenCancel"
              />
            </q-card-section>
          </q-card>
          <!-- </q-expansion-item> -->
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
import OrdenEditForm from '../components/forms/OrdenEditForm.vue';
import OrdenTable from '../components/tables/OrdenTable.vue';
import { useOrdenFetchAllQuery, useOrdenFetchByIdQuery } from '../composables';
import { useLaboratorioFormStore } from '../stores';

const { $reset } = useLaboratorioFormStore();
const { ordenSeleccionada } = storeToRefs(useLaboratorioFormStore());
const query = ref<Query>({});
const selectedID = ref<number>(0);
const accion = ref<string>('');
const {
  data,
  isFetching,
  refetch: refetchAllOrdens,
} = useOrdenFetchAllQuery(query);
const {
  data: orden,
  isFetching: isOrdenFetching,
  refetch,
} = useOrdenFetchByIdQuery(selectedID, !!selectedID.value);
const panel = ref('list');

const handleRequest = (req: OnRequestParameter) => {
  query.value.page = req.pagination.page;
  query.value.limit = req.pagination.rowsPerPage;
  query.value.search = req.filter;
  query.value.orderBy = req.pagination.sortBy;
  query.value.sortedBy = req.pagination.descending ? 'desc' : 'asc';
};

const onOrdenCancel = async () => {
  ordenSeleccionada.value = undefined;
  await refetchAllOrdens.value();
};

const editarOrden = async (id: number) => {
  ordenSeleccionada.value = undefined;
  selectedID.value = id;
  accion.value = 'edit';
  await refetch.value();
  if (orden.value) {
    ordenSeleccionada.value = orden.value;
    panel.value = 'edit-orden';
  }
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
