<template>
  <q-dialog v-model="open" persistent>
    <q-card style="width: 1200px; max-width: 90vw">
      <q-card-section>
        <q-item>
          <q-item-section avatar>
            <q-icon
              color="primary"
              name="fas fa-circle-exclamation"
              size="xl"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-h6">Triaje</q-item-label>
            <q-item-label lines="2" class="text-subtitle2 text-italic">
              Por favor, rellene los campos para continuar.
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section>
        <!-- <base-form :loading="false" @submit="onSubmit" @cancel="open = false">
          <base-input
            v-for="item in signos"
            :key="item.id"
            :name="item.id + ''"
            :suffix="item.unidad"
            :label="item.nombre"
            :stack-label="true"
            class="col-xs-12 col-sm-4"
          />
        </base-form> -->
        <Form ref="form" @submit="onSubmit">
          <base-input
            v-for="item in signos"
            :key="item.id"
            :name="item.id + ''"
            :suffix="item.unidad"
            :label="item.nombre"
            :stack-label="true"
            class="col-xs-12 col-sm-4"
          />
        </Form>
      </q-card-section>
      <q-card-section>
        <pre>{{ arr_signos }}</pre>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { useSignoFetchAllQuery } from 'core/signo';
import BaseInput from 'shared/components/base/BaseInput.vue';
import { Form, useForm } from 'vee-validate';
import { reactive, ref } from 'vue';
const props = defineProps<{
  modelValue: boolean;
  // diagnosticos: Diagnostico[];
  // paciente: Paciente;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', ...args: unknown[]): void;
  (e: 'submit', number: number): void;
}>();
const open = useVModel(props, 'modelValue', emit);
// const validationSchema = object().shape({
//   diagnostico_id: string().trim().required().label('Diagnostico'),
//   empleado_id: string().trim().required().label('Medico'),
//   fecha_inicio: string().required().label('Fecha Inicio'),
//   observaciones: string().nullable().label('Observaciones'),
//   fecha_fin: string().required().label('Fecha Fin'),
//   medicamentos: array().required().label('Medicamentos'),
//   complicaciones: array().optional().label('Complicaciones'),
// });
const form = reactive({});
const { handleSubmit } = useForm();
const { data: signos } = useSignoFetchAllQuery();
const arr_signos = ref<{ id: number; nombre: string; valor: number }[]>([]);

// const onSubmit = handleSubmit(
//   async (values) => {
//     arr_signos.value = [];
//     if (signos.value) {
//       console.log(values);
//       signos.value.forEach((signo) => {
//         if (values[signo.id]) {
//           arr_signos.value.push({
//             id: signo.id,
//             nombre: signo.nombre,
//             valor: values[signo.id],
//           });
//         }
//       });
//     }
//   },
//   (errors) => {
//     console.log(Object.values(errors.errors));
//   }
// );
const onSubmit = () => {
  console.log('first');
};
</script>
