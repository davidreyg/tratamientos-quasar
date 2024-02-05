<template>
  <base-form>
    <base-input
      :value="formatDate(control.fecha_inicio as string)"
      :borderless="true"
      :readonly="true"
      :outlined="false"
      required
      name="fecha_inicio"
      label="Fecha Inicio"
      class="col-xs-12 col-sm-4"
    />
    <base-input
      :value="formatDate(control.fecha_fin as string)"
      :borderless="true"
      :readonly="true"
      :outlined="false"
      required
      name="fecha_fin"
      class="col-xs-12 col-sm-4"
      label="Fecha Fin"
    />
    <base-input
      :borderless="true"
      :readonly="true"
      :outlined="false"
      name="medico_id"
      label="Medico"
      class="col-xs-12 col-sm-4"
    />
    <div class="col-xs-12 col-sm-6">
      <div>Tratamiento</div>
      <ul>
        <li v-for="field in control.medicamentos.data" :key="field.id">
          {{ field.nombre }}
        </li>
      </ul>
    </div>
    <div class="col-xs-12 col-sm-6">
      <div>Complicaciones</div>
      <ul>
        <li v-for="field in control.complicaciones.data" :key="field.id">
          {{ field.nombre }}
        </li>
      </ul>
    </div>
    <base-input
      :borderless="true"
      :readonly="true"
      :outlined="false"
      type="textarea"
      name="observaciones"
      label="Observaciones"
      class="col-xs-12 col-sm-6"
    />
    <template #actions>
      <q-card-actions class="col-12 justify-end q-pa-none q-pt-md">
        <q-btn
          label="Volver"
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
import BaseForm from 'shared/components/base/BaseForm.vue';
import BaseInput from 'shared/components/base/BaseInput.vue';
import { useLuxonFormat } from 'shared/utils';
import { PropType } from 'vue';
import { Control } from '../models';
defineProps({
  control: {
    type: Object as PropType<Control>,
    required: true,
  },
});
defineEmits<{
  (e: 'cancel'): void;
}>();

const { formatDate } = useLuxonFormat();
// const validationSchema = object().shape({
//   diagnostico_id: string().trim().required().label('Diagnostico'),
//   medico_id: string().trim().required().label('Medico'),
//   fecha_inicio: string().required().label('Fecha Inicio'),
//   observaciones: string().nullable().label('Observaciones'),
//   fecha_fin: string().required().label('Fecha Fin'),
//   medicamentos: array().required().label('Medicamentos'),
//   complicaciones: array().optional().label('Complicaciones'),
// });
</script>
