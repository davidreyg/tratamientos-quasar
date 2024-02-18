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
        <Form
          v-if="schema"
          ref="form"
          :validation-schema="schema"
          @submit="onSubmit"
        >
          <div class="col-12 row q-col-gutter-lg">
            <base-input
              v-for="item in signos"
              :key="item.id"
              :name="item.id + ''"
              :suffix="item.unidad"
              :label="item.nombre"
              :stack-label="true"
              class="col-xs-12 col-sm-4"
            />
          </div>
          <q-card-actions class="col-12 justify-end q-pa-none q-pt-md">
            <q-btn
              label="Cancelar"
              color="primary"
              no-caps
              outline
              @click="open = false"
            />
            <q-btn
              label="Guardar"
              type="submit"
              icon="fas fa-floppy-disk"
              color="primary"
              no-caps
            />
          </q-card-actions>
        </Form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { useSignoFetchAllQuery } from 'core/signo';
import BaseInput from 'shared/components/base/BaseInput.vue';
import { Form } from 'vee-validate';
import { computed, ref } from 'vue';
import * as yup from 'yup';
import { SignoItemRequest } from '../requests';
const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', ...args: unknown[]): void;
  (e: 'submit', items: SignoItemRequest[]): void;
}>();
const open = useVModel(props, 'modelValue', emit);

const { data: signos } = useSignoFetchAllQuery();
const schema = computed(() => {
  // if (signos.value) {
  return signos.value?.reduce((schema, field) => {
    const rschema = schema.shape({
      [field.id + '']: yup
        .number()
        .concat(field.is_required ? yup.number().required() : yup.number())
        .transform((_, value) => (value === '' ? undefined : _))
        .positive()
        .typeError('debe ingresar un numero')
        .label(field.nombre),
    });
    return rschema;
  }, yup.object());
});

const arr_signos = ref<SignoItemRequest[]>([]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onSubmit = (values: any) => {
  arr_signos.value = [];
  if (signos.value) {
    // console.log(values);
    signos.value.forEach((signo) => {
      if (values[signo.id]) {
        arr_signos.value.push({
          id: signo.id,
          nombre: signo.nombre,
          valor: Number(values[signo.id]),
        });
      }
    });
    emit('submit', arr_signos.value);
    open.value = false;
  }
};
</script>
