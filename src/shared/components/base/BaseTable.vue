<template>
  <q-table
    v-model:selected="refSelected"
    v-model:pagination="refPagination"
    :rows="data"
    :grid="refGrid"
    :columns="columns"
    :selection="selection"
    :filter="refFilter"
    :row-key="rowKey"
    separator="horizontal"
    :loading="loading"
    :rows-per-page-options="[6, 10, 20, 50, 0]"
    @request="handleRequest"
  >
    <template
      v-for="(column, index) in columns
        ?.filter((c) => c.name !== 'actions')
        .filter((c) => c.name !== 'index')"
      #[`body-cell-${column.name}`]="props"
      :key="index"
    >
      <q-td :props="props" :class="props.col.__thClass">
        <slot :name="`body-cell-${column.name}`" :props="props">
          {{ props.value }}
        </slot>
      </q-td>
    </template>
    <template #body-cell-index="props">
      <q-td :props="props" :class="props.col__thClass" auto-width>
        {{ props.rowIndex + 1 }}
      </q-td>
    </template>
    <template #top>
      <div class="col-12 q-mb-md">
        <div class="row justify-between q-col-gutter-sm">
          <div class="col-md-auto col-sm-auto col-xs-12">
            <q-input
              v-model="refFilter"
              borderless
              dense
              outlined
              debounce="300"
              placeholder="Buscar..."
            >
              <template #append>
                <q-icon name="fas fa-magnifying-glass" />
              </template>
            </q-input>
          </div>
          <div class="col-md-6 col-sm-auto col-xs-12">
            <q-btn
              v-if="showGridToggle"
              flat
              padding="0"
              class="q-mr-md"
              :icon="refGrid ? 'fas fa-table' : 'fas fa-grip'"
              size="lg"
              color="primary"
              @click="refGrid = !refGrid"
            />
            <q-btn
              v-if="refSelected.length > 0"
              color="negative"
              icon="far fa-trash-can"
              label="Eliminar"
              no-caps
            />
          </div>
        </div>
      </div>
    </template>
    <template #body-cell-actions="props">
      <q-td :class="props.col.__thClass">
        <slot name="customActions" :props="props">
          <q-btn round flat color="primary" icon="fas fa-ellipsis">
            <q-menu
              self="top start"
              fit
              transition-show="flip-right"
              transition-hide="jump-up"
            >
              <q-card class="my-card" flat>
                <q-list style="min-width: 100px">
                  <slot :key="props.key" name="actions"> acciones </slot>
                </q-list>
              </q-card>
            </q-menu>
          </q-btn>
        </slot>
      </q-td>
    </template>
    <template #item="props">
      <slot name="item" :props="(props as ItemProps)">
        haz tu propia card...
      </slot>
    </template>
  </q-table>
</template>

<script setup lang="ts" generic="T">
import { QTable } from 'quasar';
import { OnRequestParameter, ServerPagination } from 'shared/utils';
import { PropType, ref, watch } from 'vue';
interface ItemProps {
  key: string;
  row: T;
  value: string;
  col: {
    name: string;
    align: 'left' | 'right' | 'center' | undefined;
    label: string;
    field: string;
    // __iconClass: 'q-table__sort-icon q-table__sort-icon--left';
    __thClass: string;
  };
  cols: {
    name: string;
    align: 'left' | 'right' | 'center' | undefined;
    label: string;
    field: string;
    // __iconClass: 'q-table__sort-icon q-table__sort-icon--left';
    __thClass: string;
    value: string;
  }[];
}

//[ ] Falta realizar el selectAll para seleccionar todos los checkbox.
//[ ] Falta realizar el destroyMany.
const componentProps = defineProps({
  columns: {
    type: Array as PropType<QTable['columns']>,
    required: true,
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
  data: {
    type: Array<T>,
    required: true,
  },
  rowKey: {
    type: String,
    required: true,
  },
  selection: {
    type: String as PropType<QTable['selection']>,
    required: false,
    default: 'none',
  },
  showGridToggle: {
    type: Boolean,
    required: false,
    default: false,
  },
  grid: {
    type: Boolean,
    required: false,
    default: false,
  },
  serverPagination: {
    type: Object as PropType<ServerPagination>,
    default: undefined,
  },
});
const emit = defineEmits<{
  request: [req: OnRequestParameter];
}>();

const refSelected = ref<T[]>([]);
const refFilter = ref('');
const refGrid = ref(componentProps.grid);
const refPagination = ref<QTable['pagination']>({
  page: 1,
  rowsPerPage: 6,
  sortBy: 'id',
  descending: false,
  rowsNumber: undefined,
  // totalPages: undefined,
});

const handleRequest: QTable['onRequest'] = (r) => {
  emit('request', r as OnRequestParameter);
  refPagination.value = r.pagination;
};

watch(
  () => componentProps.serverPagination,
  (newServerPagination) => {
    if (newServerPagination && refPagination.value) {
      // console.log('aqui? :o');
      refPagination.value.rowsNumber = newServerPagination.total;
      refPagination.value.totalPages = newServerPagination.total_pages;
      refPagination.value.page = newServerPagination.current_page;
      refPagination.value.rowsPerPage = newServerPagination.per_page;
    }
  },
  { immediate: true }
);
</script>

<style scoped></style>
