<template>
  <q-tab-panels v-if="paciente" v-model="panel" animated class="">
    <q-tab-panel name="list">
      <div
        v-if="diagnosticosDelPaciente.length === 0"
        class="col-12 row justify-center"
      >
        <div class="col-auto">
          <q-icon name="fas fa-face-frown" size="xl" />
        </div>
        <div class="col-12 text-center text-h6">
          Lo sentimos. ¡No se encontró ningun diagnóstico!. Porfavor registre
          uno para empezar :)
        </div>
        <q-btn
          class="q-mt-lg"
          color="primary"
          icon="fas fa-plus"
          no-caps
          label="Agregar nuevo diagnostico"
          outline
          @click="panel = 'new'"
        />
      </div>
      <div v-else>
        <div class="col-12 row justify-center">
          <div class="col-auto">
            <q-icon name="fas fa-face-grin-beam-sweat" size="xl" />
          </div>
          <div class="col-12 text-center text-h6">
            Por favor seleccione un diagnostico. :)
          </div>
          <q-btn
            class="q-mt-lg"
            color="primary"
            icon="fas fa-list-check"
            no-caps
            label="Visualizar Diagnosticos"
            outline
            @click="isModalOpen = true"
          />
        </div>
      </div>
    </q-tab-panel>

    <q-tab-panel name="new">
      <diagnostico-create-form
        :paciente-id="paciente.id"
        @cancel="panel = 'list'"
        @submit="onSubmitDiagnosticoCreateForm"
      />
    </q-tab-panel>

    <q-tab-panel v-if="diagnosticoSeleccionado" name="edit">
      <diagnostico-edit-form
        :diagnostico="diagnosticoSeleccionado"
        @cancel="onCancelDiagnosticoForm"
        @submit="onSubmitDiagnosticoCreateForm(paciente.id)"
      />
    </q-tab-panel>
  </q-tab-panels>
  <diagnosticos-list-modal
    v-if="paciente"
    v-model="isModalOpen"
    :paciente="paciente"
    :diagnosticos="diagnosticosDelPaciente"
    @add-diagnostico="onAddDiagnostico"
    @select="onSelectedDiagnostico"
  />
</template>

<script setup lang="ts">
import { useDiagnosticoFormStore } from 'core/diagnostico';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import DiagnosticoCreateForm from '../DiagnosticoCreateForm.vue';
import DiagnosticoEditForm from '../DiagnosticoEditForm.vue';
import DiagnosticosListModal from '../DiagnosticosListModal.vue';

const {
  paciente,
  diagnosticosDelPaciente,
  diagnosticoSeleccionado,
  controlesDelDiagnostico,
  controlSeleccionado,
} = storeToRefs(useDiagnosticoFormStore());
const { fetchDiagnosticosDelPaciente } = useDiagnosticoFormStore();
const panel = ref('list');
const isModalOpen = ref(false);

const onCancelDiagnosticoForm = () => {
  diagnosticoSeleccionado.value = undefined;
  controlSeleccionado.value = undefined;
  controlesDelDiagnostico.value = [];
  panel.value = 'list';
  // onCancelControlForm();
};

const onSubmitDiagnosticoCreateForm = async (paciente_id: string) => {
  onCancelDiagnosticoForm();
  await fetchDiagnosticosDelPaciente(paciente_id);
};

const onAddDiagnostico = () => {
  onCancelDiagnosticoForm();
  panel.value = 'new';
  isModalOpen.value = false;
};

const onSelectedDiagnostico = async () => {
  // await fetchDiagnosticoById(id);
  panel.value = 'edit';
  isModalOpen.value = false;
};
</script>
