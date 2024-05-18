<template>
  <base-form :loading="isLoading" @submit="onSubmit" @cancel="$emit('cancel')">
    <base-input
      required
      type="date"
      name="fecha_inicio"
      label="Fecha Inicio"
      class="col-xs-12 col-sm-4"
      :min-date="DateTime.now().toISODate()"
    />
    <base-input
      required
      type="date"
      name="fecha_fin"
      label="Fecha Fin"
      class="col-xs-12 col-sm-4"
      :min-date="DateTime.now().toISODate()"
    />
    <base-select
      :options="arr_medicos"
      name="empleado_id"
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
    <base-input
      type="textarea"
      name="observaciones"
      label="Observaciones"
      class="col-xs-12 col-sm-6"
    />
  </base-form>
</template>

<script setup lang="ts">
import { useComplicacionFetchAllQuery } from 'core/complicacion';
import { useManageEnfermedadesArray } from 'core/diagnostico';
import { useEmpleadoFetchAllMedicosQuery } from 'core/empleado';
import { useMedicamentoFetchAllQuery } from 'core/medicamento';
import { DateTime } from 'luxon';
import { QSelectOption } from 'quasar';
import BaseForm from 'shared/components/base/BaseForm.vue';
import BaseInput from 'shared/components/base/BaseInput.vue';
import BaseSelect from 'shared/components/base/BaseSelect.vue';
import { NotifyUtils } from 'shared/utils';
import { useForm } from 'vee-validate';
import { PropType, computed, ref, watch } from 'vue';
import { array, object, string } from 'yup';
import { useControlUpdateMutation } from '../composables';
import { Control } from '../models';
import { ControlCreateRequest } from '../requests';
const props = defineProps({
  diagnosticoId: {
    type: String,
    required: true,
  },
  control: {
    type: Object as PropType<Control>,
    required: true,
  },
});
const emit = defineEmits<{
  (e: 'submit', paciente_id: string): void;
  (e: 'cancel'): void;
}>();

const { data: medicos } = useEmpleadoFetchAllMedicosQuery();
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
  empleado_id: string().trim().required().label('Medico'),
  fecha_inicio: string().required().label('Fecha Inicio'),
  observaciones: string().nullable().label('Observaciones'),
  fecha_fin: string().required().label('Fecha Fin'),
  medicamentos: array().required().label('Medicamentos'),
  complicaciones: array().optional().label('Complicaciones'),
});

const { handleSubmit, setFieldValue } = useForm<ControlCreateRequest>({
  validationSchema,
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
const { mutate, isLoading } = useControlUpdateMutation();

const onSubmit = handleSubmit(async (values) => {
  mutate(
    { data: values, id: props.control.id },
    {
      onSuccess: () => {
        NotifyUtils.success('Control actualizado correctamente');
        emit('submit', props.diagnosticoId);
      },
      onError: (err) => {
        console.log(err);
        // setErrors(err.data.errors);
      },
    }
  );
});

watch(
  () => props.control,
  (newValue) => {
    setFieldValue('fecha_inicio', newValue.fecha_inicio);
    setFieldValue('fecha_fin', newValue.fecha_fin);
    setFieldValue('empleado_id', newValue.medico.data.id);
    setFieldValue('observaciones', newValue.observaciones);
    newValue.medicamentos.data.forEach((v) => {
      push({ label: v.nombre, value: v.id });
    });
    newValue.complicaciones.data.forEach((v) => {
      pushComplicacion({ label: v.nombre, value: v.id });
    });
  },
  { immediate: true }
);
</script>
