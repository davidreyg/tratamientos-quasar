<template>
  <div class="row">
    <base-form
      class="col-xs-12 col-sm-6"
      :loading="isLoading"
      @submit="onSubmit"
      @cancel="$emit('cancel')"
    >
      <base-input name="nombre" label="Nombre" class="col-12" />
    </base-form>
  </div>
</template>

<script setup lang="ts">
import { CategoriaRequest, useCategoriaCreateMutation } from 'core/categoria';
import BaseForm from 'shared/components/base/BaseForm.vue';
import BaseInput from 'shared/components/base/BaseInput.vue';
import { NotifyUtils } from 'shared/utils';
import { useForm } from 'vee-validate';
import { object, string } from 'yup';
const emit = defineEmits<{
  submit: [];
  cancel: [];
}>();
const validationSchema = object().shape({
  nombre: string().trim().min(2).required().label('Nombre'),
});

const { handleSubmit, setErrors } = useForm<CategoriaRequest>({
  validationSchema,
});

const { isLoading, mutate, reset } = useCategoriaCreateMutation();

const onSubmit = handleSubmit(async (values) => {
  mutate(values, {
    onSuccess: () => {
      NotifyUtils.success();
      emit('submit');
    },
    onError: (err) => {
      reset.value();
      setErrors(err.data.errors);
    },
  });
});
</script>
