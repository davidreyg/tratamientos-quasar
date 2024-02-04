<template>
  <base-form @submit="onSubmit" @cancel="$emit('cancel')">
    <div class="col-xs-12 col-sm-4">
      <base-date-picker
        required
        name="fecha_inicio"
        label="Fecha Inicio"
        :min-date="DateTime.now()"
      />
    </div>
    <div class="col-xs-12 col-sm-4">
      <base-date-picker
        required
        name="fecha_fin"
        label="Fecha Fin"
        :min-date="DateTime.now()"
      />
    </div>
    <base-select
      :options="arr_medicos"
      name="medico_id"
      label="Medico"
      class="col-xs-12 col-sm-4"
    />
    <div class="col-xs-12 col-sm-6">
      <q-select
        v-model="selectMedicamentos"
        :options="arr_medicamentos"
        borderless
        dense
        name="medicamento"
        label="Tratamiento"
      >
        <template #after>
          <q-btn
            :disable="!selectMedicamentos"
            round
            dense
            icon="add"
            color="positive"
            @click="()=>{push(selectMedicamentos!);selectMedicamentos=undefined}"
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
    <div class="col-xs-12 col-sm-6">
      <q-select
        v-model="selectComplicacion"
        :options="arr_complicaciones"
        borderless
        dense
        name="complicacion"
        label="Complicaciones"
      >
        <template #after>
          <q-btn
            :disable="!selectComplicacion"
            round
            dense
            icon="add"
            color="positive"
            @click="()=>{pushComplicacion(selectComplicacion!);selectComplicacion=undefined}"
          />
        </template>
      </q-select>
      <q-list>
        <q-item
          v-for="(field, idx) in arr_complicaciones_seleccionadas"
          :key="field.value"
        >
          <q-item-section>{{ field.label }}</q-item-section>
          <q-item-section side>
            <q-btn
              round
              flat
              size="lg"
              padding="0"
              color="negative"
              icon="cancel"
              @click="removeComplicacion(idx)"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </base-form>
</template>

<script setup lang="ts">
import { useComplicacionFetchAllQuery } from 'core/complicacion';
import { useManageEnfermedadesArray } from 'core/diagnostico';
import { useMedicamentoFetchAllQuery } from 'core/medicamento';
import { useMedicoFetchAllQuery } from 'core/persona';
import { DateTime } from 'luxon';
import { QSelectOption } from 'quasar';
import BaseDatePicker from 'shared/components/base/BaseDatePicker.vue';
import BaseForm from 'shared/components/base/BaseForm.vue';
import BaseSelect from 'shared/components/base/BaseSelect.vue';
import { NotifyUtils } from 'shared/utils';
import { useForm } from 'vee-validate';
import { computed, ref } from 'vue';
import { array, object, string } from 'yup';
import { useControlCreateMutation } from '../composables';
import { ControlCreateRequest } from '../requests';
const props = defineProps({
  diagnosticoId: {
    type: String,
    required: true,
  },
});
const emit = defineEmits<{
  (e: 'submit', paciente_id: string): void;
  (e: 'cancel'): void;
}>();

const { data: medicos } = useMedicoFetchAllQuery();
const { data: medicamentos } = useMedicamentoFetchAllQuery();
const { data: complicaciones } = useComplicacionFetchAllQuery();

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
const arr_medicamentos = computed(() => {
  if (medicamentos.value) {
    return medicamentos.value.map((val) => {
      return {
        label: val.nombre,
        value: val.id,
      };
    });
  }
  return [];
});
const arr_complicaciones = computed(() => {
  if (complicaciones.value) {
    return complicaciones.value.map((val) => {
      return {
        label: val.nombre,
        value: val.id,
      };
    });
  }
  return [];
});
const validationSchema = object().shape({
  diagnostico_id: string().trim().required().label('Diagnostico'),
  medico_id: string().trim().required().label('Medico'),
  fecha_inicio: string().required().label('Fecha Inicio'),
  fecha_fin: string().required().label('Fecha Fin'),
  medicamentos: array().required().label('Medicamentos'),
  complicaciones: array().optional().label('Complicaciones'),
});

const { handleSubmit, setFieldValue } = useForm<ControlCreateRequest>({
  validationSchema,
  initialValues: {
    fecha_inicio: DateTime.now().toISODate(),
    fecha_fin: DateTime.now().toISODate(),
  },
});
setFieldValue('diagnostico_id', props.diagnosticoId);
const selectMedicamentos = ref<QSelectOption>();
const selectComplicacion = ref<QSelectOption>();
const { arr_seleccionados, remove, push } =
  useManageEnfermedadesArray('medicamentos');

const {
  arr_seleccionados: arr_complicaciones_seleccionadas,
  remove: removeComplicacion,
  push: pushComplicacion,
} = useManageEnfermedadesArray('complicaciones');
const { mutate } = useControlCreateMutation();

const onSubmit = handleSubmit(async (values) => {
  mutate(values, {
    onSuccess: () => {
      NotifyUtils.success('Control registrado correctamente');
      emit('submit', props.diagnosticoId);
    },
    onError: (err) => {
      console.log(err);
      // setErrors(err.data.errors);
    },
  });
});
</script>

<style scoped></style>
