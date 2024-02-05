<template>
  <base-form :loading="isLoading" @submit="onSubmit" @cancel="$emit('cancel')">
    <base-select
      :options="arr_financiamientos"
      name="financiamiento_id"
      label="Financiamiento"
      class="col-xs-12 col-sm-6"
    />
    <base-select
      :options="arr_medicos"
      name="medico_id"
      label="Medico"
      class="col-xs-12 col-sm-6"
    />
    <div class="col-xs-12 col-sm-6">
      <q-select
        v-model="selectEnfermedad"
        :options="arr_enfermedades"
        borderless
        dense
        name="enfermedad"
        label="Enfermedades"
      >
        <template #after>
          <q-btn
            :disable="!selectEnfermedad"
            round
            dense
            icon="add"
            color="positive"
            @click="()=>{push(selectEnfermedad!);selectEnfermedad=undefined}"
          />
        </template>
      </q-select>
      <q-list>
        <q-item v-for="(field, idx) in arr_seleccionados" :key="field.value">
          <q-item-section>{{ field.label }}</q-item-section>
          <q-item-section side>
            <q-btn
              round
              flat
              size="lg"
              padding="0"
              color="negative"
              icon="cancel"
              @click="remove(idx)"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <base-input
      type="textarea"
      name="observaciones"
      label="Observaciones"
      class="col-xs-12 col-sm-6"
    />
  </base-form>
</template>

<script setup lang="ts">
import { useEnfermedadFetchAllQuery } from 'core/enfermedad';
import { useFinanciamientoFetchAllQuery } from 'core/financiamiento';
import { useMedicoFetchAllQuery } from 'core/persona';
import { QSelectOption } from 'quasar';
import BaseForm from 'shared/components/base/BaseForm.vue';
import BaseInput from 'shared/components/base/BaseInput.vue';
import BaseSelect from 'shared/components/base/BaseSelect.vue';
import { NotifyUtils } from 'shared/utils';
import { useForm } from 'vee-validate';
import { computed, ref } from 'vue';
import { array, object, string } from 'yup';
import {
  useDiagnosticoCreateMutation,
  useManageEnfermedadesArray,
} from '../composables';
import { DiagnosticoCreateRequest } from '../requests';
const props = defineProps({
  pacienteId: {
    type: String,
    required: true,
  },
});
const emit = defineEmits<{
  (e: 'submit', paciente_id: string): void;
  (e: 'cancel'): void;
}>();

const { data: financiamientos } = useFinanciamientoFetchAllQuery();
const { data: medicos } = useMedicoFetchAllQuery();
const { data: enfermedades } = useEnfermedadFetchAllQuery();
const arr_financiamientos = computed(() => {
  if (financiamientos.value) {
    return financiamientos.value.map((val) => {
      return {
        label: val.nombre,
        value: val.id,
      };
    });
  }
  return [];
});
const arr_medicos = computed(() => {
  if (medicos.value) {
    return medicos.value.map((val) => {
      return {
        label:
          val.nombres + ' ' + val.apellido_paterno + ' ' + val.apellido_materno,
        value: val.id,
      };
    });
  }
  return [];
});
const arr_enfermedades = computed(() => {
  if (enfermedades.value) {
    return enfermedades.value.map((val) => {
      return {
        label: val.nombre,
        value: val.id,
      };
    });
  }
  return [];
});
const validationSchema = object().shape({
  financiamiento_id: string().trim().required().label('Financiamiento'),
  paciente_id: string().trim().required().label('Paciente'),
  medico_id: string().trim().required().label('Medico'),
  observaciones: string().trim().required().max(100).label('Observaciones'),
  enfermedades: array().required().label('Enfermedades'),
});

const { handleSubmit, setFieldValue } = useForm<DiagnosticoCreateRequest>({
  validationSchema,
});
setFieldValue('paciente_id', props.pacienteId);
const selectEnfermedad = ref<QSelectOption>();
const { arr_seleccionados, remove, push } =
  useManageEnfermedadesArray('enfermedades');
const { mutate, isLoading } = useDiagnosticoCreateMutation();

const onSubmit = handleSubmit(async (values) => {
  mutate(values, {
    onSuccess: () => {
      NotifyUtils.success('Diagnostico registrado correctamente');
      emit('submit', props.pacienteId);
    },
    onError: (err) => {
      console.log(err);
      // setErrors(err.data.errors);
    },
  });
});
</script>

<style scoped></style>
