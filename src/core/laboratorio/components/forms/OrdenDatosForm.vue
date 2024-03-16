<template>
  <q-form class="row">
    <div class="col-12 text-bold text-italic">Datos Generales:</div>

    <base-input
      name="diagnostico"
      label="Diagnostico"
      class="col-xs-12 col-sm-4"
      required
      readonly
      borderless
      :outlined="false"
      :value="orden.diagnostico"
    />
    <base-input
      name="CI10"
      label="CI10"
      class="col-xs-12 col-sm-4"
      required
      readonly
      borderless
      :outlined="false"
      :value="orden.CI10"
    />
    <base-input
      name="CPN"
      label="CPN"
      class="col-xs-12 col-sm-4"
      required
      readonly
      borderless
      :outlined="false"
      :value="orden.CPN"
    />
    <base-input
      name="EG"
      label="EG"
      class="col-xs-12 col-sm-4"
      required
      readonly
      borderless
      :outlined="false"
      :value="orden.EG"
    />
    <base-input
      name="codigo_atencion"
      label="Codigo de Atención"
      class="col-xs-12 col-sm-4"
      required
      readonly
      borderless
      :outlined="false"
      :value="orden.codigo_atencion"
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
      :value="orden.fecha_registro"
    />
    <div class="col-12 text-bold text-italic">
      Datos del Establecimiento de Origen:
    </div>
    <base-input
      name="establecimiento_tipo"
      class="col-xs-12 col-sm-4"
      label="Tipo de Establecimiento"
      required
      readonly
      borderless
      :outlined="false"
      :value="orden.establecimiento ? 'Jurisdiccion' : 'Externo'"
    />
    <base-input
      name="establecimiento_id"
      class="col-xs-12 col-sm-8"
      label="Establecimiento Origen"
      required
      readonly
      borderless
      :outlined="false"
      :value="
        orden.establecimiento
          ? orden.establecimiento.data.nombre
          : orden.establecimiento_otro
      "
    />

    <div class="col-12 text-bold text-italic">Datos del Medico:</div>
    <base-input
      name="medico"
      label="Nombre"
      class="col-xs-12 col-sm-6"
      required
      readonly
      borderless
      :outlined="false"
      :value="orden.medico"
    />
    <div class="col-12 text-bold text-italic">Datos del paciente:</div>
    <base-input
      name="paciente"
      label="Nombre"
      class="col-xs-12 col-sm-4"
      required
      readonly
      borderless
      :outlined="false"
      :value="orden.paciente.data.nombre_completo"
    />
    <base-input
      name="documento"
      label="N° de Documento"
      class="col-xs-12 col-sm-4"
      required
      readonly
      borderless
      :outlined="false"
      :value="orden.paciente.data.numero_documento"
    />
  </q-form>
</template>

<script setup lang="ts">
import { Orden } from 'core/laboratorio/models';
import BaseInput from 'shared/components/base/BaseInput.vue';
import { PropType } from 'vue';
defineProps({
  orden: {
    type: Object as PropType<Orden>,
    required: true,
  },
});
</script>
