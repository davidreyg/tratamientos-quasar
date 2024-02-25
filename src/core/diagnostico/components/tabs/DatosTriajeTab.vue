<template>
  <q-tab-panels v-model="panel" animated>
    <q-tab-panel name="list">
      <q-form class="">
        <div class="col-12 row q-col-gutter-lg">
          <base-input
            type="date"
            name="fecha_registro"
            label="Fecha de Registro"
            class="col-xs-12 col-sm-4"
            required
          >
            <template #after>
              <q-btn
                round
                type="submit"
                dense
                icon="search"
                color="primary"
                :loading="isLoading"
                @click="onSubmit"
              >
                <q-tooltip> Buscar Triaje</q-tooltip>
              </q-btn>
            </template>
          </base-input>
        </div>
      </q-form>
    </q-tab-panel>
    <q-tab-panel name="new">
      <triaje-create-form
        :paciente-id="Number(paciente.id)"
        :fecha-registro="(values.fecha_registro as string)"
        @cancel="onCancel"
      />
    </q-tab-panel>
    <q-tab-panel name="view">
      <triaje-view-form
        v-if="triajeSeleccionado"
        :triaje="triajeSeleccionado"
        @cancel="onCancel"
      />
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup lang="ts">
import { useDiagnosticoFormStore } from 'core/diagnostico/stores';
import { Paciente } from 'core/paciente';
import { useTriajeFetchByFechaQuery } from 'core/triaje';
import TriajeCreateForm from 'core/triaje/components/forms/TriajeCreateForm.vue';
import TriajeViewForm from 'core/triaje/components/forms/TriajeViewForm.vue';
import { DateTime } from 'luxon';
import { storeToRefs } from 'pinia';
import BaseInput from 'shared/components/base/BaseInput.vue';
import Swal from 'sweetalert2';
import { useForm } from 'vee-validate';
import { PropType, ref, watch } from 'vue';
import { date, object } from 'yup';

const props = defineProps({
  paciente: {
    type: Object as PropType<Paciente>,
    required: true,
  },
});

const panel = ref('list');
const { fetch, triaje, isLoading } = useTriajeFetchByFechaQuery();
const { setTriajeSeleccionado, clearTriajeSeleccionado } =
  useDiagnosticoFormStore();
const { triajeSeleccionado } = storeToRefs(useDiagnosticoFormStore());
const validationSchema = object().shape({
  fecha_registro: date().required().label('Fecha de Registro'),
});
const { handleSubmit, resetForm, values } = useForm<{
  fecha_registro: Date | string;
}>({
  validationSchema,
  initialValues: { fecha_registro: DateTime.now().toISODate() },
});

const onSubmit = handleSubmit(
  async (values) => {
    await fetch(values.fecha_registro, Number(props.paciente.id));
    if (triaje.value) {
      setTriajeSeleccionado(triaje.value);
      Swal.fire({
        title: 'Exito!',
        text: 'Triaje encontrado correctamente!',
        icon: 'success',
      });
      panel.value = 'view';
    } else {
      Swal.fire({
        title: 'Información!',
        text: 'No se encontro el TRIAJE para dicha Fecha!. ¿Desea registrarlo ahora?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Si',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          panel.value = 'new';
          // Swal.fire({
          //   title: "Deleted!",
          //   text: "Your file has been deleted.",
          //   icon: "success"
          // });
        }
      });
    }
  },
  (e) => {
    console.log(e);
  }
);

const onCancel = () => {
  clearTriajeSeleccionado();
  panel.value = 'list';
  resetForm();
};

watch(
  () => triajeSeleccionado.value,
  (newValue) => {
    if (newValue) {
      panel.value = 'view';
    } else {
      panel.value = 'list';
      resetForm();
    }
  }
);
</script>
