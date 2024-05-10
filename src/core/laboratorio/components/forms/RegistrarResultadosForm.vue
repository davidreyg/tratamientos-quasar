<template>
  <resultado-form-dinamico
    v-if="fields.length > 0 && validationSchema"
    :fields="fields"
    :validation-schema="validationSchema"
    :initial-values="initialValues"
    :orden-id="Number(orden.id)"
    :examens="props.orden.examens.data"
    :items="props.orden.items.data"
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
        .mixed()
        .when(['tipo'], {
          is: (tipo: string) => tipo == 'unidad',
          then: () =>
            yup
              .number()
              .positive()
              .typeError('Debe ingresar un numero')
              .label('Resultado'),
          // otherwise: (schema) => schema.nullable(),
        })
        .when(['tipo'], {
          is: (tipo: string) => tipo === 'string',
          then: () => yup.string().trim().label('Resultado'),
          // otherwise: (schema) => schema.nullable(),
        })
        .when(['tipo'], {
          is: (tipo: string) => tipo === 'respuesta',
          then: () => yup.string().trim().label('Resultado'),
          // otherwise: (schema) => schema.nullable(),
        })
        .when(['is_enabled', 'is_canceled', 'tipo'], {
          is: (isEnabled: boolean, isCanceled: boolean, tipo: string) =>
            isEnabled && !isCanceled && tipo.toLowerCase() !== 'respuesta',
          then: (schema) => schema.required(),
          otherwise: (schema) => schema.nullable(),
        })
        .transform((_, value) => (value === '' ? undefined : _)),

      fecha_resultado: yup.string().required().label('Fecha'),
      unidad_id: yup
        .number()
        .when(['is_enabled', 'is_canceled', 'has_items', 'tipo'], {
          is: (
            isEnabled: boolean,
            isCanceled: boolean,
            hasItems: boolean,
            tipo: string
          ) => isEnabled && !isCanceled && !hasItems && tipo === 'unidad',
          then: (schema) => schema.required(),
          otherwise: (schema) => schema.nullable(),
        })
        .label('Unidad'),
      is_canceled: yup.boolean().required().label('Cancelado?'),
      is_enabled: yup.boolean().required().label('Hablitad?'),
      has_items: yup.boolean().required().label('Tiene items?'),
      motivo: yup
        .string()
        .when(['is_enabled', 'is_canceled'], {
          is: true,
          then: (schema) => schema.required(),
          otherwise: (schema) => schema.nullable(),
        })
        .label('Motivo'),
      minimo: yup.number(),
      maximo: yup.number().nullable(),
      tipo_unidad: yup.string(),
      operador_unidad: yup.string().nullable(),
      unidads: yup.array(),
      items: yup.array(),
      respuestas: yup.array(),
      tipo: yup.string().required().label('Tipo'),
      respuesta_id: yup
        .number()
        .when(['is_enabled', 'is_canceled', 'tipo'], {
          is: (isEnabled: boolean, isCanceled: boolean, tipo: string) =>
            isEnabled && !isCanceled && tipo === 'respuesta',
          then: (schema) => schema.required(),
          otherwise: (schema) => schema.nullable(),
        })
        .label('Respuesta'),
    };
    return yup.object().shape(reglas);
  })
);
const schema_item_orden = yup.array().of(
  yup.lazy(() => {
    let reglas = {};
    reglas = {
      item_id: yup.mixed().required().label('Item'),
      examen_id: yup.mixed().required().label('Examen'),
      resultado: yup
        .mixed()
        .when(['tipo'], {
          is: (tipo: string) => tipo == 'unidad',
          then: () =>
            yup
              .number()
              .positive()
              .typeError('Debe ingresar un numero')
              .label('Resultado'),
          // otherwise: (schema) => schema.nullable(),
        })
        .when(['tipo'], {
          is: (tipo: string) => tipo === 'string',
          then: () => yup.string().trim().label('Resultado'),
          // otherwise: (schema) => schema.nullable(),
        })
        .when(['tipo'], {
          is: (tipo: string) => tipo === 'respuesta',
          then: () => yup.string().trim().label('Resultado'),
          // otherwise: (schema) => schema.nullable(),
        })
        .when(['is_enabled', 'is_canceled', 'tipo'], {
          is: (isEnabled: boolean, isCanceled: boolean, tipo: string) =>
            isEnabled && !isCanceled && tipo.toLowerCase() !== 'respuesta',
          then: (schema) => schema.required(),
          otherwise: (schema) => schema.nullable(),
        })
        .transform((_, value) => (value === '' ? undefined : _)),
      unidad_id: yup
        .number()
        .when(['is_enabled', 'is_canceled', 'tipo'], {
          is: (isEnabled: boolean, isCanceled: boolean, tipo: string) =>
            isEnabled && !isCanceled && tipo === 'unidad',
          then: (schema) => schema.required(),
          otherwise: (schema) => schema.nullable(),
        })
        .label('Unidad'),
      respuesta_id: yup
        .number()
        .when(['is_enabled', 'is_canceled', 'tipo'], {
          is: (isEnabled: boolean, isCanceled: boolean, tipo: string) =>
            isEnabled && !isCanceled && tipo === 'respuesta',
          then: (schema) => schema.required(),
          otherwise: (schema) => schema.nullable(),
        })
        .label('Respuesta'),
      minimo: yup.number(),
      maximo: yup.number().nullable(),
      tipo_unidad: yup.string(),
      operador_unidad: yup.string().nullable(),
      is_canceled: yup.boolean().required().label('Cancelado?'),
      is_enabled: yup.boolean().required().label('Habilitado?'),
      respuestas: yup.array(),
      tipo: yup.string().required().label('Tipo'),
    };
    return yup.object().shape(reglas);
  })
);

validationSchema.value = yup
  .object()
  .shape({ pivot: schema_pivot, item_orden: schema_item_orden });
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
    respuesta_id: pivot.respuesta_id,
    is_canceled: pivot.is_canceled,
    is_enabled: true,
    has_items: examen ? examen.items.data.length > 0 : false,
    tipo: examen && examen.tipo.toLowerCase(),
    motivo: pivot.motivo,
    unidads: examen
      ? examen.unidads.data.map((v) => ({
          label: v.nombre,
          value: Number(v.id),
        }))
      : [],
    respuestas: examen
      ? examen.respuestas.data.map((v) => ({
          label: v.nombre,
          value: Number(v.id),
        }))
      : [],
    items: props.orden.items.data
      .map((item, index) => ({ pivot_index: index, examen_id: item.examen_id }))
      .filter((item) => item.examen_id === Number(examen?.id)),
  };
});
const initialValuesItemOrden = props.orden.item_orden.map((pivot) => {
  const item = props.orden.items.data.find(
    (v) => Number(v.id) == pivot.item_id
  );
  return {
    item_id: pivot.item_id,
    examen_id: item?.examen_id,
    resultado: pivot.resultado,
    unidad_id: pivot.unidad_id,
    respuesta_id: pivot.respuesta_id,
    is_canceled: pivot.is_canceled,
    is_enabled: true,
    tipo: item && item.tipo.toLowerCase(),
    unidads: item
      ? item.unidads.data.map((v) => ({
          label: v.nombre,
          value: Number(v.id),
        }))
      : [],
    respuestas: item
      ? item.respuestas.data.map((v) => ({
          label: v.nombre,
          value: Number(v.id),
        }))
      : [],
  };
});

initialValues.value = {
  pivot: initialValuesPivot,
  item_orden: initialValuesItemOrden,
  observaciones: props.orden.observaciones,
};
</script>
