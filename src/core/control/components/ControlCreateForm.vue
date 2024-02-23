<template>
  <base-form :loading="isLoading" @submit="onSubmit" @cancel="$emit('cancel')">
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
      name="empleado_id"
      label="Medico"
      class="col-xs-12 col-sm-4"
    />
    <div class="col-xs-12 col-sm-6">
      <base-select
        v-model="selectMedicamentos"
        :options="arr_medicamentos"
        :outlined="false"
        :emit-value="false"
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
      </base-select>
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
      <base-select
        v-model="selectComplicacion"
        :options="arr_complicaciones"
        borderless
        :outlined="false"
        :emit-value="false"
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
      </base-select>
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
import BaseDatePicker from 'shared/components/base/BaseDatePicker.vue';
import BaseForm from 'shared/components/base/BaseForm.vue';
import BaseInput from 'shared/components/base/BaseInput.vue';
import BaseSelect from 'shared/components/base/BaseSelect.vue';
import { NotifyUtils } from 'shared/utils';
import { useForm } from 'vee-validate';
import { PropType, computed, ref, watch } from 'vue';
import { array, number, object, string } from 'yup';
import { useControlCreateMutation } from '../composables';
import { Control } from '../models';
import { ControlCreateRequest } from '../requests';
const props = defineProps({
  diagnosticoId: {
    type: String,
    required: true,
  },
  triajeId: {
    type: Number,
    required: true,
  },
  ultimoControl: {
    type: Object as PropType<Control>,
    required: false,
    default: undefined,
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
  triaje_id: number().required().label('Triaje'),
  fecha_inicio: string().required().label('Fecha Inicio'),
  observaciones: string().nullable().label('Observaciones'),
  fecha_fin: string().required().label('Fecha Fin'),
  medicamentos: array().required().label('Medicamentos'),
  complicaciones: array().optional().label('Complicaciones'),
  triaje: array()
    .of(
      object().shape({
        id: string().required().label('Id'),
        nombre: string().nullable().label('Nombre'),
        valor: number().positive().required().label('Valor'),
      })
    )
    .strict(),
});

const { handleSubmit, setFieldValue } = useForm<ControlCreateRequest>({
  validationSchema,
  initialValues: {
    fecha_inicio: DateTime.now().toISODate(),
    fecha_fin: DateTime.now().toISODate(),
  },
});

setFieldValue('diagnostico_id', props.diagnosticoId);
setFieldValue('triaje_id', props.triajeId);
const selectMedicamentos = ref<QSelectOption>();
const selectComplicacion = ref<QSelectOption>();
const { arr_seleccionados, remove, push } =
  useManageEnfermedadesArray('medicamentos');

const {
  arr_seleccionados: arr_complicaciones_seleccionadas,
  remove: removeComplicacion,
  push: pushComplicacion,
} = useManageEnfermedadesArray('complicaciones');

const { mutate, isLoading } = useControlCreateMutation();

const onSubmit = handleSubmit(
  async (values) => {
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
  },
  (errors) => {
    console.log(Object.values(errors.errors));
  }
);

watch(
  () => props.ultimoControl,
  (newValue) => {
    if (newValue) {
      setFieldValue('empleado_id', newValue.medico.data.id);
      newValue.medicamentos.data.forEach((v) => {
        push({ label: v.nombre, value: v.id });
      });
    }
  },
  { immediate: true }
);
</script>
