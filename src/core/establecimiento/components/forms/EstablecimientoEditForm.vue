<template>
  <base-form :loading="isLoading" @submit="onSubmit" @cancel="$emit('cancel')">
    <base-input name="nombre" label="Nombre" class="col-12" />
    <base-input name="codigo" label="Codigo" class="col-6" />
    <base-input name="telefono" label="Telefono" class="col-6" />
    <base-input name="direccion" label="Direccion" class="col-12" />
    <base-input name="ris" label="RIS" class="col-6" />
    <base-check-box name="has_lab" label="¿Tiene Laboratorio?" class="col-6" />
  </base-form>
</template>

<script setup lang="ts">
import {
  Establecimiento,
  EstablecimientoRequest,
  useEstablecimientoUpdateMutation,
} from 'core/establecimiento';
import BaseCheckBox from 'shared/components/base/BaseCheckBox.vue';
import BaseForm from 'shared/components/base/BaseForm.vue';
import BaseInput from 'shared/components/base/BaseInput.vue';
import { useForm } from 'vee-validate';
import { PropType } from 'vue';
import { boolean, number, object, string } from 'yup';
const props = defineProps({
  establecimiento: {
    type: Object as PropType<Establecimiento>,
    required: true,
  },
});
const emit = defineEmits<{
  submit: [];
  cancel: [];
}>();
const validationSchema = object().shape({
  nombre: string().trim().min(2).required().label('Nombre'),
  codigo: number()
    .typeError('Codigo debe ser un numero')
    .integer()
    .positive()
    .required()
    .label('Codigo'),
  direccion: string().trim().min(2).max(60).required().label('Direccion'),
  telefono: number()
    .typeError('Teléfono debe ser un numero')
    .integer()
    .positive()
    .nullable()
    .label('Telefono'),
  ris: string().trim().min(2).max(60).required().label('RIS'),
  has_lab: boolean().required().label('¿Laboratorio?'),
});

const { handleSubmit, setErrors } = useForm<EstablecimientoRequest>({
  validationSchema,
  initialValues: props.establecimiento,
});

const { isLoading, mutate } = useEstablecimientoUpdateMutation();

const onSubmit = handleSubmit(async (values) => {
  mutate(
    { data: values, id: props.establecimiento.id },
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
