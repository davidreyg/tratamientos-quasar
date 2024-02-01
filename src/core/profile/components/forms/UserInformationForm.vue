<template>
  <base-form @submit="isModalOpen = true">
    <q-item class="col-12">
      <q-item-section side>
        <q-avatar size="70px" class="q-mb-sm">
          <q-img src="/avatar/avatar-1.jpg" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>
          <q-btn color="primary" label="Cambiar" no-caps outline />
        </q-item-label>
      </q-item-section>
    </q-item>
    <base-input
      disable
      name="name"
      label="Nombre de usuario"
      class="col-xs-12 col-sm-6 col-md-6"
    />
    <div class="col-xs-0 col-sm-6 col-md-6"></div>
    <base-input
      name="password"
      type="password"
      label="Nueva Contraseña"
      class="col-xs-12 col-sm-6 col-md-6"
    />
    <base-input
      name="password_confirmation"
      type="password"
      label="Confirmar Contraseña"
      class="col-xs-12 col-sm-6 col-md-6"
    />
    <template #actions>
      <q-card-actions class="col-12 justify-end q-pa-none q-pt-md">
        <q-btn
          label="Guardar"
          type="submit"
          color="primary"
          no-caps
          :disable="!meta.valid"
        />
        <q-btn
          label="Cancelar"
          color="primary"
          no-caps
          outline
          @click="resetForm"
        />
      </q-card-actions>
    </template>
    <confirm-current-password-modal v-model="isModalOpen" @submit="onSubmit" />
  </base-form>
</template>

<script setup lang="ts">
import { useAuthStore } from 'core/auth/stores';
import { useUpdatePasswordMutation } from 'core/profile/composables';
import { UpdatePasswordRequest } from 'core/profile/requests';
import BaseForm from 'shared/components/base/BaseForm.vue';
import BaseInput from 'shared/components/base/BaseInput.vue';
import { NotifyUtils } from 'shared/utils';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { object, string, ref as yupRef } from 'yup';
import ConfirmCurrentPasswordModal from '../modals/ConfirmCurrentPasswordModal.vue';

const { user } = useAuthStore();

const validationSchema = object().shape({
  name: string().required().label('Usuario'),
  password: string().required().min(5).label('Contraseña'),
  password_confirmation: string()
    .required()
    .oneOf([yupRef('password')], 'Las contraseñas no coinciden')
    .label('Contraseña'),
});
const { handleSubmit, setErrors, resetForm, meta } =
  useForm<UpdatePasswordRequest>({
    validationSchema,
    initialValues: {
      name: user?.name,
    },
  });

const { mutate } = useUpdatePasswordMutation();
const isModalOpen = ref(false);
const onSubmit = handleSubmit(
  async (values) => {
    mutate(values, {
      onSuccess: () => {
        resetForm();
        NotifyUtils.success('Contraseña actualizada correctamente!');
      },
      onError: (err) => {
        setErrors(err.data.errors);
      },
    });
  },
  (f) => setErrors(f.errors)
);
</script>

<style scoped></style>
