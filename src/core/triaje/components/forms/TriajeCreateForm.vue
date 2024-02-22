<template>
  <form-dinamico
    v-if="fields.length > 0 && validationSchema"
    :fields="fields"
    :validation-schema="validationSchema"
    :initial-values="initialValues"
    @cancel="$emit('cancel')"
    @submit="$emit('submit')"
  />
</template>

<script setup lang="ts">
import { useSignoFetchAllQuery } from 'core/signo';
import { DateTime } from 'luxon';
import { Field, Query } from 'shared/utils';
import { ref, watch } from 'vue';
import * as yup from 'yup';
import FormDinamico from './FormDinamico.vue';

defineEmits<{
  (e: 'submit'): void;
  (e: 'cancel'): void;
}>();
const props = defineProps({
  pacienteId: {
    type: Number,
    required: true,
  },
});
const query = ref<Query>({ search: 'estado:1' });
const { data: signos } = useSignoFetchAllQuery(query);
const fields = ref<Field[]>([]);
const validationSchema = ref<yup.AnyObjectSchema>();
const initialValues = ref();
watch(
  () => signos.value,
  (newValue) => {
    if (newValue) {
      //CONSTRUIR LOS FIELDS
      const fields_signos_vitales: Field[] = newValue.map((signo) => {
        return {
          label: signo.nombre,
          name: signo.nombre,
          type: 'number',
          suffix: signo.unidad,
        };
      });
      fields.value = [
        {
          name: 'fecha_registro',
          label: 'Fecha Registro',
          type: 'date',
          // fields: fields_signos_vitales,
        },
        {
          name: 'pivot',
          label: 'Signos',
          type: 'array',
          fields: fields_signos_vitales,
        },
      ];

      // CONSTRUIR EL VALIDATIONSCHEMA
      const schema_signos = yup.array().of(
        yup.lazy((value) => {
          // console.log(value);
          const signo = newValue.find((v) => v.id == value.signo_id);
          let reglas = {};
          if (signo) {
            reglas = {
              signo_id: yup
                .mixed()
                .when([], {
                  is: () => signo.is_required,
                  then: (schema) => schema.required(),
                  otherwise: (schema) => schema.optional(),
                })
                .label('Id del signo'),
              valor: yup
                .number()
                .positive()
                .when([], {
                  is: () => signo.is_required,
                  then: (schema) => schema.required(),
                  otherwise: (schema) => schema.optional(),
                })
                .transform((_, value) => (value === '' ? undefined : _))
                .typeError('Debe ingresar un numero')
                .label(signo.nombre),
            };
          }
          return yup.object().shape(reglas);
        })
      );

      const base = yup
        .object()
        .shape({
          fecha_registro: yup.date().required().label('Fecha Registro'),
        })
        .required();

      validationSchema.value = base.concat(
        yup.object().shape({ pivot: schema_signos })
      );

      //CONSTRUIR LOS VALORES INICALES
      const initialValuesSignos = newValue.map((signo) => {
        return {
          signo_id: signo.id,
          valor: undefined,
        };
      });

      initialValues.value = {
        fecha_registro: DateTime.now().toISODate(),
        paciente_id: props.pacienteId,
        pivot: initialValuesSignos,
      };
    }
  },
  { immediate: true }
);
</script>
