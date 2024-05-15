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
                :loading="
                  accion === 'pdf' &&
                  isResultadosPDFfetching &&
                  selectedID === Number(props.key)
                "
                size="sm"
                @click="verResultadosPDF(Number(props.key))"
              >
                <q-tooltip>Imprimir Resultados.</q-tooltip>
              </q-btn>
              <q-btn
                v-if="props.row.estado === 2"
                color="info"
                icon="fas fa-print"
                round
                flat
                :loading="
                  accion === 'pdf' &&
                  isOrdenPDFfetching &&
                  selectedID === Number(props.key)
                "
                size="sm"
                @click="verOrdenPDF(Number(props.key))"
              >
                <q-tooltip>Imprimir Orden.</q-tooltip>
              </q-btn>
              <q-btn
                v-if="props.row.estado !== 2"
                color="negative"
                icon="fas fa-trash-can"
                round
                flat
                size="sm"
                @click="deleteOrden(Number(props.key))"
              >
                <q-tooltip>Eliminar orden.</q-tooltip>
              </q-btn>
            </template>
          </orden-table>
        </q-tab-panel>
        <q-tab-panel name="edit-orden">
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
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <orden-PDF-modal v-if="pdfUrl" v-model="isModalOpen" :pdf-url="pdfUrl" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { NotifyUtils, OnRequestParameter, Query } from 'shared/utils';
import Swal from 'sweetalert2';
import { ref, watch } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import OrdenEditForm from '../components/forms/OrdenEditForm.vue';
import OrdenPDFModal from '../components/modals/OrdenPDFModal.vue';
import OrdenTable from '../components/tables/OrdenTable.vue';
import {
  useOrdenDeleteMutation,
  useOrdenFetchAllQuery,
  useOrdenFetchByIdQuery,
  useOrdenFetchOrdenPDFQuery,
  useOrdenFetchResultadosPDFQuery,
} from '../composables';
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

const {
  data: resultadosPDF,
  isFetching: isResultadosPDFfetching,
  refetch: refetchResultadosPDF,
} = useOrdenFetchResultadosPDFQuery(selectedID, !!selectedID.value);

const {
  data: ordenPDF,
  isFetching: isOrdenPDFfetching,
  refetch: refetchOrdenPDF,
} = useOrdenFetchOrdenPDFQuery(selectedID, !!selectedID.value);

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

const { mutateAsync } = useOrdenDeleteMutation();
const deleteOrden = async (id: number) => {
  ordenSeleccionada.value = undefined;
  selectedID.value = id;
  NotifyUtils.confirmDialog(id, {
    title: '¿Esta seguro de eliminar esta ORDEN?',
    preConfirm: async () => {
      // console.log(key, typeof key);
      await mutateAsync(id, {
        onSuccess: async () => {
          NotifyUtils.success('Orden eliminada correctamente.');
          onOrdenCancel();
        },
        onError: () => {
          Swal.hideLoading();
        },
      });
    },
  });
};

const pdfUrl = ref('');
const isModalOpen = ref(false);
const verResultadosPDF = async (id: number) => {
  ordenSeleccionada.value = undefined;
  selectedID.value = id;
  accion.value = 'pdf';
  await refetchResultadosPDF.value();
  if (resultadosPDF.value) {
    pdfUrl.value = URL.createObjectURL(
      new Blob([resultadosPDF.value], { type: 'application/pdf' })
    );
    // Abrir el PDF en una nueva pestaña del navegador
    window.open(pdfUrl.value, '_blank');
    // isModalOpen.value = true;
  }
};

const verOrdenPDF = async (id: number) => {
  ordenSeleccionada.value = undefined;
  selectedID.value = id;
  accion.value = 'pdf';
  await refetchOrdenPDF.value();
  if (ordenPDF.value) {
    pdfUrl.value = URL.createObjectURL(
      new Blob([ordenPDF.value], { type: 'application/pdf' })
    );
    // Abrir el PDF en una nueva pestaña del navegador
    window.open(pdfUrl.value, '_blank');
    // isModalOpen.value = true;
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
