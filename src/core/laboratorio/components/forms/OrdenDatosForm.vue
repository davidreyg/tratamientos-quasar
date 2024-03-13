<template>
  <base-form>
    <base-input
      name="medico"
      label="Medico"
      class="col-xs-12 col-sm-6"
      required
      readonly
      borderless
      :outlined="false"
    />
    <base-select
      v-if="orden.establecimiento_id"
      :options="arr_establecimientos"
      name="establecimiento_id"
      class="col-xs-12 col-sm-6"
      label="Establecimiento Institucional"
      :loading="false"
      required
      readonly
      borderless
      :outlined="false"
    />
    <base-input
      v-else
      name="establecimiento_otro"
      label="Otro establecimiento"
      class="col-xs-12 col-sm-6"
      required
      readonly
      borderless
      :outlined="false"
    />
    <base-input
      name="diagnostico"
      label="Diagnostico"
      class="col-xs-12 col-sm-4"
      required
      readonly
      borderless
      :outlined="false"
    />
    <base-input
      name="CI10"
      label="CI10"
      class="col-xs-12 col-sm-4"
      required
      readonly
      borderless
      :outlined="false"
    />
    <base-input
      name="CPN"
      label="CPN"
      class="col-xs-12 col-sm-4"
      required
      readonly
      borderless
      :outlined="false"
    />
    <base-input
      name="EG"
      label="EG"
      class="col-xs-12 col-sm-4"
      required
      readonly
      borderless
      :outlined="false"
    />
    <base-input
      name="codigo_atencion"
      label="Codigo de Atención"
      class="col-xs-12 col-sm-4"
      required
      readonly
      borderless
      :outlined="false"
    />
    <base-input
      name="fecha_registro"
      label="Fecha de Registro"
      class="col-xs-12 col-sm-4"
      type="date"
      required
      readonly
      borderless
      :outlined="false"
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
      </q-card-actions>
    </template>
  </base-form>
</template>

<script setup lang="ts">
import { useEstablecimientoFetchAllQuery } from 'core/establecimiento';
import { Orden } from 'core/laboratorio/models';
import { OrdenCreateRequest } from 'core/laboratorio/requests';
import BaseForm from 'shared/components/base/BaseForm.vue';
import BaseInput from 'shared/components/base/BaseInput.vue';
import BaseSelect from 'shared/components/base/BaseSelect.vue';
import { useForm } from 'vee-validate';
import { PropType, computed } from 'vue';
import { array, number, object, string } from 'yup';
const props = defineProps({
  orden: {
    type: Object as PropType<Orden>,
    required: true,
  },
});
defineEmits<{
  (e: 'cancel'): void;
}>();
const { data: establecimientos } = useEstablecimientoFetchAllQuery();

const arr_establecimientos = computed(() => {
  if (establecimientos.value) {
    return establecimientos.value.map((val) => {
      return {
        label: val.nombre,
        value: Number(val.id),
      };
    });
  }
  return [];
});

const validationSchema = object().shape({
  diagnostico: string().trim().min(2).required().label('Diagnostico'),
  CI10: string().trim().min(2).required().label('CI10'),
  CPN: string().trim().min(2).required().label('CPN'),
  EG: string().trim().min(2).required().label('EG'),
  codigo_atencion: string()
    .trim()
    .min(2)
    .required()
    .label('Codigo de Atencion'),
  fecha_registro: string().trim().required().label('Fecha de Registro'),
  medico: string().trim().required().label('Médico'),
  examen_ids: array().of(number().required()).required().label('Examenes'),
  paquete_ids: array().of(number().required()).required().label('Paquetes'),
  establecimiento_id: number().label('Establecimiento Institucional'),
  establecimiento_otro: string().label('Otro Establecimiento'),
});

const {} = useForm<OrdenCreateRequest>({
  validationSchema,
  initialValues: props.orden,
});
</script>
