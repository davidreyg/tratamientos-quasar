<template>
  <q-form @submit.prevent="onSubmit">
    <div
      v-for="(_, index) in fields"
      :key="index"
      class="row q-col-gutter-sm q-mb-sm"
    >
      <base-select
        label="Examen"
        :name="`pivot[${index}].examen_id`"
        :options="arr_examens"
        class="col-3"
        required
        borderless
        readonly
        :outlined="false"
      />
      <base-input
        v-if="values.pivot[index].is_canceled"
        :name="`pivot[${index}].motivo`"
        label="Motivo"
        class="col-4"
        required
      />
      <base-input
        v-if="!values.pivot[index].is_canceled"
        :name="`pivot[${index}].resultado`"
        :bg-color="calcularColorResultado(index)"
        label="Resultado"
        class="col-2"
        required
      />
      <base-select
        v-if="!values.pivot[index].is_canceled"
        label="Unidad"
        :name="`pivot[${index}].unidad_id`"
        :options="values.pivot[index].unidads"
        :hint="calcularHintUnidad(index)"
        class="col-2"
        required
      />
      <base-input
        label="Fecha"
        type="date"
        :name="`pivot[${index}].fecha_resultado`"
        required
        class="col-2"
      />
      <q-card-actions class="col-3 self-center">
        <q-btn
          :icon="values.pivot[index].is_canceled ? 'fas fa-pen' : 'fas fa-ban'"
          :color="values.pivot[index].is_canceled ? 'warning' : 'negative'"
          round
          flat
          size="sm"
          @click="ignorarResultado(index)"
        >
          <q-tooltip>{{
            values.pivot[index].is_canceled
              ? 'Registrar datos.'
              : 'Cancelar examen.'
          }}</q-tooltip>
        </q-btn>
      </q-card-actions>
    </div>
    <div class="row">
      <q-card-actions class="col-12 justify-end q-pa-none q-pt-md">
        <q-btn
          label="Cancelar"
          color="primary"
          no-caps
          outline
          @click="$emit('cancel')"
        />
        <q-btn
          label="Guardar"
          type="submit"
          icon="fas fa-floppy-disk"
          color="primary"
          :loading="isLoading"
          no-caps
        />
      </q-card-actions>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { Examen } from 'core/examen';
import { useOrdenUpdateExamensMutation } from 'core/laboratorio/composables';
import { OrdenResultadosRequest } from 'core/laboratorio/requests';
import BaseInput from 'shared/components/base/BaseInput.vue';
import BaseSelect from 'shared/components/base/BaseSelect.vue';
import { Field, NotifyUtils } from 'shared/utils';
import { useForm } from 'vee-validate';
import { computed, watch } from 'vue';
const emit = defineEmits<{
  (e: 'submit'): void;
  (e: 'cancel'): void;
}>();

const props = defineProps({
  fields: {
    type: Array<Field[]>,
    required: true,
  },
  examens: {
    type: Array<Examen>,
    required: true,
  },
  ordenId: {
    type: Number,
    required: true,
  },
  initialValues: {
    type: Object,
    required: false,
    default: undefined,
  },
  validationSchema: {
    type: Object,
    required: true,
  },
});

const arr_examens = computed(() => {
  if (props.examens) {
    return props.examens.map((val) => {
      return {
        label: val.nombre,
        value: Number(val.id),
      };
    });
  }
  return [];
});

const { handleSubmit, setFieldValue, values } = useForm({
  validationSchema: props.validationSchema,
  initialValues: props.initialValues,
});

const { mutateAsync, reset, isLoading } = useOrdenUpdateExamensMutation();
const onSubmit = handleSubmit(async (values, { setErrors }) => {
  await mutateAsync(
    { id: props.ordenId, data: values as OrdenResultadosRequest },
    {
      onSuccess: () => {
        NotifyUtils.success('Resultados actualizados correctamente');
        emit('submit');
        reset.value();
      },
      onError: (err) => {
        reset.value();
        setErrors(err.data.errors);
      },
    }
  );
});

const calcularHintUnidad = (index: number) => {
  let str = undefined;
  if (!!values.pivot[index].minimo && !!values.pivot[index].minimo) {
    str = `Min: ${values.pivot[index].minimo} - Max: ${values.pivot[index].maximo}`;
  }
  return str;
};
const calcularColorResultado = (index: number) => {
  let color = undefined;
  if (!!values.pivot[index].minimo && !!values.pivot[index].minimo) {
    if (
      values.pivot[index].resultado > values.pivot[index].minimo &&
      values.pivot[index].resultado < values.pivot[index].maximo
    ) {
      color = 'green-2';
    } else {
      color = 'red-2';
    }
  }
  return color;
};
const ignorarResultado = (index: number) => {
  const is_canceled = 'pivot[' + index + '].is_canceled';
  const valor = values.pivot[index].is_canceled;
  setFieldValue(is_canceled, !valor);
};
props.fields.forEach((_, index) => {
  watch(
    () => values.pivot[index].unidad_id,
    (newValue) => {
      const examen = props.examens.find(
        (v) => v.id == values.pivot[index].examen_id
      );
      if (!!examen && !!newValue) {
        const piv = examen.pivot.find((v) => v.unidad_id === newValue);
        const minimo = 'pivot[' + index + '].minimo';
        const maximo = 'pivot[' + index + '].maximo';
        if (piv) {
          setFieldValue(minimo, piv.minimo);
          setFieldValue(maximo, piv.maximo);
        }
      }
    },
    { deep: true, immediate: true }
  );
});
</script>
