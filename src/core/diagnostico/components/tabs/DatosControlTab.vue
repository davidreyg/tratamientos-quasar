<template>
  <q-tab-panels
    v-if="diagnosticoSeleccionado"
    v-model="panel"
    animated
    class=""
  >
    <q-tab-panel name="list">
      <div
        v-if="controlesDelDiagnostico.length === 0"
        class="col-12 row justify-center"
      >
        <div class="col-auto">
          <q-icon name="fas fa-face-frown" size="xl" />
        </div>
        <div class="col-12 text-center text-h6">
          Lo sentimos. ¡No se encontró ningun control!. Porfavor registre uno
          para empezar.
        </div>
        <q-btn
          class="q-mt-lg"
          color="primary"
          icon="fas fa-plus"
          no-caps
          label="Agregar nuevo control"
          outline
          @click="onAddControl"
        />
      </div>
      <div v-else>
        <controles-table
          :loading="isLoading"
          :controles="controlesDelDiagnostico"
          :is-diagnostico-active="diagnosticoSeleccionado.estado"
          @add-control="onAddControl"
          @delete-control="
            onSubmitControlCreateForm(diagnosticoSeleccionado.id)
          "
          @edit-control="onEditControl"
          @view-control="onViewControl"
        />
      </div>
    </q-tab-panel>

    <q-tab-panel name="new">
      <control-create-form
        v-if="triajeSeleccionado"
        :triaje-id="Number(triajeSeleccionado.id)"
        :ultimo-control="
          controlesDelDiagnostico[controlesDelDiagnostico.length - 1]
        "
        :diagnostico-id="diagnosticoSeleccionado.id"
        @cancel="onCancelControlForm"
        @submit="onSubmitControlCreateForm"
      />
    </q-tab-panel>

    <q-tab-panel v-if="controlSeleccionado" name="edit">
      <control-edit-form
        :diagnostico-id="diagnosticoSeleccionado.id"
        :control="controlSeleccionado"
        @cancel="onCancelControlForm"
        @submit="onSubmitControlCreateForm(diagnosticoSeleccionado.id)"
      />
    </q-tab-panel>
    <q-tab-panel v-if="controlSeleccionado" name="view">
      <control-view-form
        :control="controlSeleccionado"
        @cancel="onCancelControlForm"
      />
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup lang="ts">
import { Control, useFetchControlesByDiagnosticoQuery } from 'core/control';
import ControlCreateForm from 'core/control/components/ControlCreateForm.vue';
import ControlEditForm from 'core/control/components/ControlEditForm.vue';
import ControlViewForm from 'core/control/components/ControlViewForm.vue';
import ControlesTable from 'core/control/components/ControlesTable.vue';
import { useDiagnosticoFormStore } from 'core/diagnostico';
import { storeToRefs } from 'pinia';
import { NotifyUtils } from 'shared/utils';
import { ref, watch } from 'vue';

const {
  controlesDelDiagnostico,
  diagnosticoSeleccionado,
  controlSeleccionado,
  triajeSeleccionado,
} = storeToRefs(useDiagnosticoFormStore());
const {
  setControlesDelDiagnostico,
  clearTriajeSeleccionado,
  setTriajeSeleccionado,
} = useDiagnosticoFormStore();
const { isLoading, controles, fetch } = useFetchControlesByDiagnosticoQuery();
const panel = ref('list');

const onSubmitControlCreateForm = async (diagnostico_id: string) => {
  onCancelControlForm();

  await fetch(diagnostico_id);
  setControlesDelDiagnostico(controles.value);
};

const onCancelControlForm = () => {
  controlSeleccionado.value = undefined;
  clearTriajeSeleccionado();
  panel.value = 'list';
};

const onEditControl = async (control: Control) => {
  controlSeleccionado.value = control;
  setTriajeSeleccionado(control.triaje.data);
  panel.value = 'edit';
};
const onViewControl = async (control: Control) => {
  controlSeleccionado.value = control;
  setTriajeSeleccionado(control.triaje.data);
  panel.value = 'view';
};

const onAddControl = () => {
  // onCancelControlForm();
  controlSeleccionado.value = undefined;
  if (triajeSeleccionado.value) {
    panel.value = 'new';
  } else {
    NotifyUtils.warn('Debe completar el triaje primero :)');
  }
};

watch(
  () => triajeSeleccionado.value,
  (newValue) => {
    if (newValue) {
      // panel.value = 'view';
    } else {
      panel.value = 'list';
      // resetForm();
    }
  }
);
</script>
