<template>
  <q-dialog v-model="open">
    <q-card>
      <q-card-section>
        <q-item>
          <q-item-section avatar>
            <q-icon
              color="negative"
              name="fas fa-circle-exclamation"
              size="xl"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-red text-h6"
              >Confirmar contraseña</q-item-label
            >
            <q-item-label lines="2" class="text-subtitle2 text-italic">
              Por su seguridad. Porfavor confirme su contraseña para continuar.
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section>
        <base-form @submit="onSubmit">
          <base-input
            name="password"
            type="password"
            label="Contraseña Actual"
            class="col-12"
          />

          <template #actions>
            <q-card-actions class="col-12 justify-end q-pa-none q-pt-md">
              <q-btn no-caps label="Confirmar" color="primary" type="submit" />
              <q-btn
                color="primary"
                no-caps
                label="Cancelar"
                outline
                @click="open = false"
              />
            </q-card-actions>
          </template>
        </base-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { useConfirmCurrentPasswordMutation } from 'core/profile/composables';
import { ConfirmCurrentPasswordRequest } from 'shared/api/ConfirmCurrentPasswordApi';
import BaseForm from 'shared/components/base/BaseForm.vue';
import BaseInput from 'shared/components/base/BaseInput.vue';
import { useForm } from 'vee-validate';
import { object, string } from 'yup';
const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits(['update:modelValue', 'submit']);
const open = useVModel(props, 'modelValue', emit);
const validationSchema = object().shape({
  password: string().required().label('Contraseña'),
});

const { handleSubmit, setErrors } = useForm<ConfirmCurrentPasswordRequest>({
  validationSchema,
});

const { mutate } = useConfirmCurrentPasswordMutation();
const onSubmit = handleSubmit(
  async (values, { resetForm }) => {
    mutate(values, {
      onSuccess: () => {
        resetForm();
        open.value = false;
        emit('submit');
      },
      onError: (err) => {
        setErrors(err.data.errors);
      },
    });
  },
  (f) => setErrors(f.errors)
);
</script>
