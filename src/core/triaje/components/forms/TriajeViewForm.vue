<template>
  <div class="row">
    <form-dinamico-view
      v-if="fields.length > 0 && validationSchema"
      :fields="fields"
      :validation-schema="validationSchema"
      :initial-values="initialValues"
      @cancel="$emit('cancel')"
    />
  </div>
</template>

<script setup lang="ts">
import { Triaje } from 'core/triaje/models';
import { Field } from 'shared/utils';
import { PropType, ref, watch } from 'vue';
import * as yup from 'yup';
import FormDinamicoView from './FormDinamicoView.vue';

defineEmits<{
  (e: 'cancel'): void;
}>();
const props = defineProps({
  triaje: {
    type: Object as PropType<Triaje>,
    required: true,
  },
});
const fields = ref<Field[]>([]);
const validationSchema = ref<yup.AnyObjectSchema>();
const initialValues = ref();
watch(
  () => props.triaje,
  (newValue) => {
    if (newValue) {
      //CONSTRUIR LOS FIELDS
      const fields_signos_vitales: Field[] = newValue.signos.data.map(
        (signo) => {
          return {
            label: signo.nombre,
            name: signo.nombre,
            type: 'number',
            suffix: signo.unidad,
          };
        }
      );
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
          const signo = newValue.signos.data.find(
            (v) => v.id == value.signo_id
          );
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

      initialValues.value = {
        fecha_registro: newValue.fecha_registro,
        paciente_id: newValue.paciente_id,
        pivot: newValue.pivot,
      };
    }
  },
  { immediate: true }
);
</script>
