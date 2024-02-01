<template>
  <base-form @submit="onSubmit">
    <base-input
      name="name"
      label="Usuario"
      type="text"
      class="col-12"
      prefix-icon="far fa-circle-user"
    />
    <base-input
      name="password"
      label="Contraseña"
      type="password"
      class="col-12"
      prefix-icon="fas fa-lock"
    />
    <template #actions>
      <q-card-actions class="col-12 q-pa-none q-pt-md">
        <q-btn
          label="Iniciar Sesión"
          type="submit"
          color="primary"
          class="full-width"
        />
      </q-card-actions>
    </template>
  </base-form>
</template>
<script setup lang="ts">
import { LoginAction, LoginRequest } from 'core/auth';
import BaseForm from 'shared/components/base/BaseForm.vue';
import BaseInput from 'shared/components/base/BaseInput.vue';
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { object, string } from 'yup';
const emit = defineEmits<{
  (e: 'submit', isOk: true): void;
}>();

const validationSchema = object().shape({
  name: string().required().label('Usuario'),
  password: string().required().min(5).label('Contraseña'),
});

const { handleSubmit } = useForm<LoginRequest>({
  validationSchema,
});
const router = useRouter();
const onSubmit = handleSubmit(
  async (values) => {
    try {
      await LoginAction.run(values);
      emit('submit', true);
      await router.push('/');
    } catch (error) {
      throw error;
    }
    // alert(JSON.stringify(values, null, 2));
  },
  (f) => console.log(f)
);
</script>
