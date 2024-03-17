<template>
  <resultado-form-dinamico
    v-if="fields.length > 0 && validationSchema"
    :fields="fields"
    :validation-schema="validationSchema"
    :initial-values="initialValues"
    :orden-id="Number(orden.id)"
    :examens="props.orden.examens.data"
    :with-observaciones="withObservaciones"
    @cancel="$emit('cancel')"
    @submit="$emit('submit')"
  />
</template>

<script setup lang="ts">
import { Orden } from 'core/laboratorio/models';
import { DateTime } from 'luxon';
import { Field } from 'shared/utils';
import { PropType, computed, ref } from 'vue';
import * as yup from 'yup';
import ResultadoFormDinamico from './ResultadoFormDinamico.vue';

defineEmits<{
  (e: 'submit'): void;
  (e: 'cancel'): void;
}>();

const arr_examens = computed(() => {
  if (props.orden.examens.data) {
    return props.orden.examens.data.map((val) => {
      return {
        label: val.nombre,
        value: Number(val.id),
      };
    });
  }
  return [];
});
const props = defineProps({
  orden: {
    type: Object as PropType<Orden>,
    required: true,
  },
  withObservaciones: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const fields = ref<Field[][]>([]);
const validationSchema = ref<yup.AnyObjectSchema>();
const initialValues = ref();

//CONSTRUIR LOS FIELDS
fields.value = props.orden.pivot.map((pivot) => {
  let fieldsPivot: Field[] = [];
  const examen = props.orden.examens.data.find(
    (v) => Number(v.id) == pivot.examen_id
  );
  fieldsPivot = [
    {
      label: 'Examen',
      name: 'examen_id',
      type: 'select',
      options: arr_examens.value,
    },
    { label: 'Resultado', name: 'resultado', type: 'string' },
    {
      label: 'Unidad',
      name: 'unidad_id',
      type: 'select',
      options: examen
        ? examen.unidads.data.map((v) => ({
            label: v.nombre,
            value: Number(v.id),
          }))
        : [],
    },
    { label: 'Fecha', name: 'fecha_resultado', type: 'date' },
    { label: 'Acciones', name: 'actions', type: 'array' },
  ];

  return fieldsPivot;
});

// CONSTRUIR EL VALIDATIONSCHEMA
const schema_pivot = yup.array().of(
  yup.lazy(() => {
    let reglas = {};
    reglas = {
      examen_id: yup.mixed().required().label('Examen'),
      resultado: yup
        .number()
        .positive()
        .when(['is_enabled', 'is_canceled'], {
          is: (isEnabled: boolean, isCanceled: boolean) =>
            isEnabled && !isCanceled,
          then: (schema) => schema.required(),
          otherwise: (schema) => schema.nullable(),
        })
        .transform((_, value) => (value === '' ? undefined : _))
        .typeError('Debe ingresar un numero')
        .label('Resultado'),
      fecha_resultado: yup.string().required().label('Fecha'),
      unidad_id: yup
        .number()
        .when(['is_enabled', 'is_canceled'], {
          is: (isEnabled: boolean, isCanceled: boolean) =>
            isEnabled && !isCanceled,
          then: (schema) => schema.required(),
          otherwise: (schema) => schema.nullable(),
        })
        .label('Unidad'),
      is_canceled: yup.boolean().required().label('Cancelado?'),
      is_enabled: yup.boolean().required().label('Hablitad?'),
      motivo: yup
        .string()
        .when(['is_enabled', 'is_canceled'], {
          is: true,
          then: (schema) => schema.required(),
          otherwise: (schema) => schema.nullable(),
        })
        .label('Motivo'),
      minimo: yup.number(),
      maximo: yup.number(),
      unidads: yup.array(),
    };
    return yup.object().shape(reglas);
  })
);

validationSchema.value = yup.object().shape({ pivot: schema_pivot });
4;

//CONSTRUIR LOS VALORES INICALES
const initialValuesPivot = props.orden.pivot.map((pivot) => {
  const examen = props.orden.examens.data.find(
    (v) => Number(v.id) == pivot.examen_id
  );
  return {
    examen_id: pivot.examen_id,
    resultado: pivot.resultado,
    fecha_resultado: pivot.fecha_resultado ?? DateTime.now().toISODate(),
    unidad_id: pivot.unidad_id,
    is_canceled: pivot.is_canceled,
    is_enabled: true,
    motivo: pivot.motivo,
    unidads: examen
      ? examen.unidads.data.map((v) => ({
          label: v.nombre,
          value: Number(v.id),
        }))
      : [],
  };
});

initialValues.value = {
  pivot: initialValuesPivot,
  observaciones: props.orden.observaciones,
};
</script>
