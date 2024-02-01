<template>
  <div class="row">
    <base-form
      class="col-sm-6 col-xs-12 col-md-5"
      :loading="isLoading"
      @submit="onSubmit"
      @cancel="$emit('cancel')"
    >
      <base-input name="name" label="Nombre" class="col-12" />
      <base-input name="display_name" label="Nombre a mostrar" class="col-12" />
      <base-input
        type="textarea"
        name="description"
        label="Descripcion"
        class="col-12"
      />
    </base-form>
  </div>
</template>

<script setup lang="ts">
import BaseForm from 'shared/components/base/BaseForm.vue';
import BaseInput from 'shared/components/base/BaseInput.vue';
import { NotifyUtils } from 'shared/utils';
import { useForm } from 'vee-validate';
import { object, string } from 'yup';
import { useRoleCreateMutation } from '../composables';
import { CreateRoleRequest } from '../requests';
const emit = defineEmits<{
  submit: [];
  cancel: [];
}>();
const validationSchema = object().shape({
  name: string()
    .trim()
    .min(2)
    .matches(/^\S*$/, 'El campo no puede tener espacios.')
    .required()
    .label('Nombre'),
  display_name: string().trim().optional().label('Nombre display'),
  description: string().trim().optional().label('Descripción'),
});

const { handleSubmit, setErrors } = useForm<CreateRoleRequest>({
  validationSchema,
});

const { isLoading, mutate } = useRoleCreateMutation();

const onSubmit = handleSubmit(async (values) => {
  mutate(values, {
    onSuccess: () => {
      NotifyUtils.success();
      emit('submit');
    },
    onError: (err) => {
      setErrors(err.data.errors);
    },
  });
});
</script>
