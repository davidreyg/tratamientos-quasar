<template>
  <base-form @submit="submit">
    <base-input
      borderless
      :outlined="false"
      readonly
      name="financiamiento_id"
      label="Financiamiento"
      class="col-xs-12 col-sm-6"
      :value="diagnostico.financiamiento.data.nombre"
    />
    <base-input
      borderless
      :outlined="false"
      readonly
      name="medico_id"
      label="Medico"
      class="col-xs-12 col-sm-6"
      :value="
        diagnostico.medico.data.nombres +
        ' ' +
        diagnostico.medico.data.apellido_paterno +
        ' ' +
        diagnostico.medico.data.apellido_materno
      "
    />
    <div class="col-xs-12 col-sm-6">
      <div>Enfermedades</div>
      <ul>
        <li v-for="field in diagnostico.enfermedades.data" :key="field.id">
          {{ field.nombre }}
        </li>
      </ul>
    </div>
    <base-input
      borderless
      :outlined="false"
      readonly
      type="textarea"
      name="observaciones"
      label="Observaciones"
      class="col-xs-12 col-sm-6"
      :value="diagnostico.observaciones"
    />
    <template #actions>
      <q-card-actions class="col-12 justify-end q-pa-none q-pt-md">
        <q-btn
          label="Cancelar"
          color="primary"
          no-caps
          outline
          @click="$emit('cancel')"
        />
        <q-btn
          v-if="diagnostico.estado"
          label="Finalizar"
          type="submit"
          icon="fas fa-hourglass-end"
          color="negative"
          no-caps
        />
      </q-card-actions>
    </template>
  </base-form>
</template>

<script setup lang="ts">
import BaseForm from 'shared/components/base/BaseForm.vue';
import BaseInput from 'shared/components/base/BaseInput.vue';
import { NotifyUtils } from 'shared/utils';
import Swal from 'sweetalert2';
import { PropType } from 'vue';
import { useDiagnosticoFinalizarMutation } from '../composables';
import { Diagnostico } from '../models';

const props = defineProps({
  diagnostico: {
    type: Object as PropType<Diagnostico>,
    required: true,
  },
});
const emit = defineEmits<{
  (e: 'submit'): void;
  (e: 'cancel'): void;
}>();

const { mutateAsync } = useDiagnosticoFinalizarMutation();
const submit = () => {
  Swal.fire({
    title: '¿Está seguro de finalizar este diagnostico?',
    text: 'No podra deshacer los cambios!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si',
    cancelButtonText: 'No',
    showLoaderOnConfirm: true,
    preConfirm: async () => {
      await mutateAsync(props.diagnostico.id, {
        onSuccess: async () => {
          NotifyUtils.success('Diagnostico finalizaado correctamente.');
          emit('submit');
        },
        onError: () => {
          Swal.hideLoading();
        },
      });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });
};
</script>

<style scoped></style>
