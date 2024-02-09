<template>
  <div class="row">
    <base-form
      class="col-sm-6 col-xs-12 col-md-5"
      :loading="isLoading"
      @submit="onSubmit"
      @cancel="$emit('cancel')"
    >
      <base-input name="nombre" label="Nombre" class="col-12" />
      <base-input name="digitos" label="N° Digitos" class="col-12" />
    </base-form>
  </div>
</template>

<script setup lang="ts">
import {
  TipoDocumento,
  TipoDocumentoRequest,
  useTipoDocumentoUpdateMutation,
} from 'core/tipo-documento';
import BaseForm from 'shared/components/base/BaseForm.vue';
import BaseInput from 'shared/components/base/BaseInput.vue';
import { useForm } from 'vee-validate';
import { PropType } from 'vue';
import { number, object, string } from 'yup';

const props = defineProps({
  tipoDocumento: {
    type: Object as PropType<TipoDocumento>,
    required: true,
  },
});
const emit = defineEmits<{
  submit: [];
  cancel: [];
}>();
const validationSchema = object().shape({
  nombre: string().trim().min(2).required().label('Nombre'),
  digitos: number()
    .typeError('Debe ingresar un numero')
    .required()
    .integer()
    .positive()
    .label('Digitos'),
});

const { handleSubmit, setErrors } = useForm<TipoDocumentoRequest>({
  validationSchema,
  initialValues: props.tipoDocumento,
});

const { isLoading, mutate } = useTipoDocumentoUpdateMutation();

const onSubmit = handleSubmit(async (values) => {
  mutate(
    { data: values, id: props.tipoDocumento.id },
    {
      onSuccess: () => {
        emit('submit');
      },
      onError: (err) => {
        setErrors(err.data.errors);
      },
    }
  );
});
</script>
