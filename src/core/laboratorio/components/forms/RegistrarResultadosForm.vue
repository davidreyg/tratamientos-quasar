<template>
  <q-card class="my-card">
    <q-card-section>
      <resultado-form-dinamico
        v-if="fields.length > 0 && validationSchema && examens"
        :fields="fields"
        :validation-schema="validationSchema"
        :initial-values="initialValues"
        :orden-id="Number(orden.id)"
        :examens="examens"
        @cancel="$emit('cancel')"
        @submit="$emit('submit')"
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useExamenFetchAllQuery } from 'core/examen';
import { Orden } from 'core/laboratorio/models';
import { DateTime } from 'luxon';
import { Field, Query } from 'shared/utils';
import { PropType, computed, ref, watch } from 'vue';
import * as yup from 'yup';
import ResultadoFormDinamico from './ResultadoFormDinamico.vue';

defineEmits<{
  (e: 'submit'): void;
  (e: 'cancel'): void;
}>();

const query = ref<Query>({ limit: 0 });
const { data: examens } = useExamenFetchAllQuery(query);
const arr_examens = computed(() => {
  if (examens.value) {
    return examens.value.map((val) => {
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
});

const fields = ref<Field[][]>([]);
const validationSchema = ref<yup.AnyObjectSchema>();
const initialValues = ref();
watch(
  () => examens.value,
  (newValue) => {
    if (newValue) {
      //CONSTRUIR LOS FIELDS
      fields.value = props.orden.pivot.map((pivot) => {
        let fieldsPivot: Field[] = [];
        const examen = newValue.find((v) => Number(v.id) == pivot.examen_id);
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
          // const examen = newValue.find((v) => v.id == value.examen_id);
          // // console.log(examen, value.unidad_id);

          // if (!!examen && !!value.unidad_id) {
          //   const x = examen.pivot.find((v) => v.unidad_id === value.unidad_id);
          //   console.log(x);
          // }
          let reglas = {};
          reglas = {
            examen_id: yup.mixed().required().label('Examen'),
            resultado: yup
              .number()
              .positive()
              .when('is_canceled', {
                is: false,
                then: (schema) => schema.nullable(),
                otherwise: (schema) => schema.nullable(),
              })
              .transform((_, value) => (value === '' ? undefined : _))
              .typeError('Debe ingresar un numero')
              .label('Resultado'),
            fecha_resultado: yup.string().required().label('Fecha'),
            unidad_id: yup
              .number()
              .when('is_canceled', {
                is: false,
                then: (schema) => schema.nullable(),
                otherwise: (schema) => schema.nullable(),
              })
              .label('Unidad'),
            is_canceled: yup.boolean().required().label('Cancelado?'),
            motivo: yup
              .string()
              .when('is_canceled', {
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
        const examen = newValue.find((v) => Number(v.id) == pivot.examen_id);
        return {
          examen_id: pivot.examen_id,
          resultado: pivot.resultado,
          fecha_resultado: pivot.fecha_resultado ?? DateTime.now().toISODate(),
          unidad_id: pivot.unidad_id,
          is_canceled: pivot.is_canceled,
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
      };
    }
  },
  { immediate: true }
);
</script>
