<template>
  <q-form>
    <div class="col-12 row q-col-gutter-lg">
      <base-input
        v-for="(field, idx) in fields.filter((field) => field.type !== 'array')"
        :key="idx"
        :name="field.name"
        :label="field.label"
        :suffix="field.suffix"
        :type="(field.type as any)"
        :stack-label="true"
        class="col-xs-12 col-sm-4"
        :borderless="true"
        :readonly="true"
        :outlined="false"
      />
      <div
        v-for="(field, idx) in fields.filter((field) => field.type === 'array')"
        :key="idx"
        class="col-12 row q-col-gutter-md"
      >
        <base-input
          v-for="(item, idxx) in field.fields"
          :key="idxx"
          :name="`pivot[${idxx}].valor`"
          :label="item.label"
          :suffix="item.suffix"
          :stack-label="true"
          class="col-xs-12 col-sm-4"
          :borderless="true"
          :readonly="true"
          :outlined="false"
        />
      </div>
    </div>

    <q-card-actions class="col-12 justify-end q-pa-none q-pt-md">
      <q-btn
        label="Cancelar"
        color="primary"
        no-caps
        outline
        @click="onCancel"
      />
    </q-card-actions>
  </q-form>
</template>

<script setup lang="ts">
import { TriajeCreateRequest } from 'core/triaje/requests';
import BaseInput from 'shared/components/base/BaseInput.vue';
import { Field } from 'shared/utils';
import { useForm } from 'vee-validate';
const emit = defineEmits<{
  (e: 'submit'): void;
  (e: 'cancel'): void;
}>();
const props = defineProps({
  fields: {
    type: Array<Field>,
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
const { resetForm } = useForm<TriajeCreateRequest>({
  validationSchema: props.validationSchema,
  initialValues: props.initialValues,
});

const onCancel = () => {
  resetForm();

  emit('cancel');
};
</script>
