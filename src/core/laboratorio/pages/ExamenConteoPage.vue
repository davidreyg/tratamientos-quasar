<template>
  <div class="row q-col-gutter-md items-center justify-between">
    <div class="col-auto">Filtros:</div>
    <q-card-actions class="col-auto" :vertical="false" align="center">
      <!-- <q-btn color="primary" label="Filtrar" type="submit" /> -->
      <q-btn
        flat
        no-caps
        label="Limpiar"
        color="negative"
        icon="fas fa-broom"
        @click="() => resetForm()"
      />
    </q-card-actions>
    <div class="col-12">
      <base-form @submit="onSubmit">
        <base-select :options="arr_ris" name="ris" label="RIS" class="col-6" />
        <base-select
          :options="arr_establecimientos"
          name="establecimiento_id"
          label="Establecimiento"
          class="col-6"
        />
        <q-select
          v-model="rango"
          :options="dateRange"
          label="Rango de Fechas"
          class="col-4"
          outlined
          dense
          map-options
          emit-value
        />
        <base-input
          type="date"
          label="Fecha Inicio"
          name="fecha_inicio"
          class="col-4"
          :min-date="new Date(new Date().getFullYear(), 0, 1)"
          :disable="disableDates"
        />
        <base-input
          type="date"
          label="Fecha Fin"
          name="fecha_fin"
          class="col-4"
          :min-date="new Date(new Date().getFullYear(), 0, 1)"
          :disable="disableDates"
        />
        <template #actions> <div v-show="false"></div> </template>
      </base-form>
    </div>
    <div class="col-12">
      <q-btn
        color="positive"
        icon="fas fa-file-excel"
        label="Exportar a excel"
        no-caps
        @click="exportToExcel"
      />
    </div>
    <examen-conteo-card v-if="examens" :examens="examens" />
  </div>
</template>

<script setup lang="ts">
import { useEstablecimientoFetchAllQuery } from 'core/establecimiento';
import ExamenConteoCard from 'core/examen/components/ExamenConteoCard.vue';
import { DateTime } from 'luxon';
import { QSelectOption } from 'quasar';
import BaseForm from 'shared/components/base/BaseForm.vue';
import BaseInput from 'shared/components/base/BaseInput.vue';
import BaseSelect from 'shared/components/base/BaseSelect.vue';
import { Query, dateRange, onChangeDateRange } from 'shared/utils';
import { useForm } from 'vee-validate';
import { computed, ref, watch } from 'vue';
import { date, object, string, ref as yupRef } from 'yup';
import {
  useExamenExportConteoQuery,
  useExamenGetConteoQuery,
} from '../composables';
import { FiltroOrdenRequest } from '../requests';
const rango = ref('Este mes');
const disableDates = ref(true);
const queryEstablecimiento = ref<Query>({ limit: 0 });
const { data: establecimientos } =
  useEstablecimientoFetchAllQuery(queryEstablecimiento);

const arr_establecimientos = computed(() => {
  if (establecimientos.value) {
    return establecimientos.value
      .filter((val) => val.ris === values.ris)
      .map((val) => {
        return {
          label: val.nombre,
          value: Number(val.id),
        };
      });
  }
  return [];
});
const arr_ris = computed(() => {
  if (establecimientos.value) {
    const uniqueRisArray: QSelectOption[] = [];
    establecimientos.value.forEach((val) => {
      if (!uniqueRisArray.some((item) => item.value === val.ris)) {
        uniqueRisArray.push({
          label: val.ris,
          value: val.ris,
        });
      }
    });
    return uniqueRisArray;
  }
  return [];
});

const validationSchema = object().shape({
  ris: string().required().label('RIS'),
  establecimiento_id: string().required().label('Establecimiento'),
  fecha_inicio: date().required().label('Fecha Inicio'),
  fecha_fin: date().required().min(yupRef('fecha_inicio')).label('Fecha Fin'),
});

const { handleSubmit, resetForm, values, setFieldValue } =
  useForm<FiltroOrdenRequest>({
    validationSchema,
    initialValues: {
      fecha_inicio: DateTime.local(
        DateTime.now().year,
        DateTime.now().month,
        1
      ).toISODate() as string,
      fecha_fin: DateTime.local(
        DateTime.now().year,
        DateTime.now().month,
        DateTime.now().daysInMonth
      ).toISODate() as string,
    },
  });
const query = ref<Query>({ ...values });
const { data: examens } = useExamenGetConteoQuery(query);
const onSubmit = handleSubmit(async (values) => {
  console.log(values);
});

const { refetch, data } = useExamenExportConteoQuery();
const exportToExcel = async () => {
  await refetch.value();
  if (data.value) {
    const url = window.URL.createObjectURL(new Blob([data.value]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'conteo_examenes.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

watch(
  () => values,
  (newValue) => {
    query.value.fecha_inicio = newValue.fecha_inicio;
    query.value.fecha_fin = newValue.fecha_fin;
    query.value.ris = newValue.ris;
    query.value.establecimiento_id = newValue.establecimiento_id;
  },
  { immediate: true, deep: true }
);
watch(
  () => rango.value,
  (newValue) => {
    const { fecha_fin, fecha_inicio } = onChangeDateRange(newValue);
    setFieldValue('fecha_inicio', fecha_inicio);
    setFieldValue('fecha_fin', fecha_fin);

    if (rango.value === 'Personalizado') {
      disableDates.value = false;
    } else {
      disableDates.value = true;
    }
  }
);
</script>
