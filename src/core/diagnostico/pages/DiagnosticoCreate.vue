<template>
  <base-page title="Registrar Atención" :loading="false">
    <template #content>
      <div class="row q-col-gutter-md">
        <q-form
          class="col-12 row q-col-gutter-lg items-start justify-center"
          @submit="onSubmit"
        >
          <base-select
            :options="arr_tipo_documentos"
            name="tipo_documento_id"
            class="col-xs-12 col-sm-4"
            label="Tipo de Documento"
            :loading="false"
            required
          />
          <base-input
            name="numero_documento"
            label="N° de Documento"
            class="col-xs-12 col-sm-4"
            required
          />
          <q-card-actions class="col-auto justify-center">
            <q-btn
              color="primary"
              outline
              size="lg"
              icon="search"
              label="Buscar"
              no-caps
              type="submit"
              :loading="isLoading"
            />
          </q-card-actions>
        </q-form>
        <div class="col-12">
          <q-expansion-item
            icon="fas fa-person"
            label="Datos del Paciente"
            caption="Editar / Crear"
          >
            <q-card class="my-card">
              <q-card-section v-if="!isLoading">
                <persona-edit-form
                  v-if="persona"
                  :persona="persona"
                  @cancel="onCancelPersonaForm"
                />
                <persona-create-form
                  v-else-if="!persona && isPacienteFormVisible"
                  @cancel="onCancelPersonaForm"
                  @submit="onSubmitPersonaCreateForm"
                />
                <div
                  v-if="!persona && !isPacienteFormVisible"
                  class="col-12 row justify-center"
                >
                  <div class="col-auto">
                    <q-icon name="fas fa-face-frown" size="xl" />
                  </div>
                  <div class="col-12 text-center text-h6">
                    Lo sentimos. ¡No se encontró ningun paciente!
                  </div>
                  <q-btn
                    class="q-mt-lg"
                    color="primary"
                    icon="fas fa-plus"
                    no-caps
                    label="Agregar nuevo paciente"
                    outline
                    @click="isPacienteFormVisible = !isPacienteFormVisible"
                  />
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <q-expansion-item
            v-if="persona"
            icon="fas fa-folder-open"
            label="Diagnóstico"
            caption="Editar"
          >
            <diagnosticos-list-modal
              v-model="isModalOpen"
              :persona="persona"
              :diagnosticos="diagnosticos || []"
              @select="onSelectedDiagnostico"
              @add-diagnostico="onAddDiagnostico"
            />
            <q-card v-if="!diagnostico" class="my-card">
              <q-card-section
                v-if="isDiagnosticosEmpty && !isDiagnosticoFormVisible"
              >
                <div class="col-12 row justify-center">
                  <div class="col-auto">
                    <q-icon name="fas fa-face-frown" size="xl" />
                  </div>
                  <div class="col-12 text-center text-h6">
                    Lo sentimos. ¡No se encontró ningun diagnóstico!. Porfavor
                    registre uno para empezar :)
                  </div>
                  <q-btn
                    class="q-mt-lg"
                    color="primary"
                    icon="fas fa-plus"
                    no-caps
                    label="Agregar nuevo diagnostico"
                    outline
                    @click="
                      isDiagnosticoFormVisible = !isDiagnosticoFormVisible
                    "
                  />
                </div>
              </q-card-section>
              <div v-if="!isDiagnosticosEmpty && !isDiagnosticoFormVisible">
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
                    @click="isModalOpen = !isModalOpen"
                  />
                </div>
              </div>
              <q-card-section v-else>
                <diagnostico-create-form
                  v-if="isDiagnosticoFormVisible"
                  :paciente-id="persona.id"
                  @cancel="isDiagnosticoFormVisible = false"
                  @submit="onSubmitDiagnosticoCreateForm"
                />
              </q-card-section>
            </q-card>
            <q-card v-else>
              <q-card-section>
                <diagnostico-edit-form
                  :diagnostico="diagnostico"
                  @cancel="onCancelDiagnosticoForm"
                  @submit="onSubmitDiagnosticoCreateForm(persona.id)"
                />
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <q-expansion-item
            v-if="diagnostico"
            icon="fas fa-list-ul"
            label="Controles"
            caption="Editar"
          >
            <q-card v-if="!control" class="my-card">
              <q-card-section
                v-if="
                  isControlesEmpty &&
                  !isControlFormVisible &&
                  diagnostico.estado
                "
              >
                <div class="col-12 row justify-center">
                  <div class="col-auto">
                    <q-icon name="fas fa-face-frown" size="xl" />
                  </div>
                  <div class="col-12 text-center text-h6">
                    Lo sentimos. ¡No se encontró ningun control!. Porfavor
                    registre uno para empezar.
                  </div>
                  <q-btn
                    class="q-mt-lg"
                    color="primary"
                    icon="fas fa-plus"
                    no-caps
                    label="Agregar nuevo control"
                    outline
                    @click="isControlFormVisible = !isControlFormVisible"
                  />
                </div>
              </q-card-section>
              <q-card-section v-if="!isControlesEmpty && !isControlFormVisible">
                <controles-table
                  :controles="controles"
                  :is-diagnostico-active="diagnostico.estado"
                  @add-control="
                    () => {
                      onCancelControlForm();
                      isControlFormVisible = true;
                    }
                  "
                  @edit-control="onEditControl"
                  @delete-control="onSubmitControlCreateForm(diagnostico.id)"
                  @view-control="onViewControlModal"
                />
              </q-card-section>
              <q-card-section v-else>
                <control-create-form
                  v-if="isControlFormVisible"
                  :ultimo-control="controles[controles.length - 1]"
                  :diagnostico-id="diagnostico.id"
                  @cancel="onCancelControlForm"
                  @submit="onSubmitControlCreateForm"
                />
              </q-card-section>
            </q-card>
            <q-card v-else>
              <q-card-section v-if="diagnostico.estado">
                <control-edit-form
                  :control="control"
                  :diagnostico-id="diagnostico.id"
                  @cancel="onCancelControlForm"
                  @submit="onSubmitControlCreateForm"
                />
              </q-card-section>
              <q-card-section v-else>
                <control-view-form
                  :control="control"
                  @cancel="onCancelControlForm"
                />
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </div>
      </div>
    </template>
  </base-page>
</template>

<script setup lang="ts">
import { useFetchControlByIdQuery } from 'core/control';
import ControlCreateForm from 'core/control/components/ControlCreateForm.vue';
import ControlEditForm from 'core/control/components/ControlEditForm.vue';
import ControlViewForm from 'core/control/components/ControlViewForm.vue';
import ControlesTable from 'core/control/components/ControlesTable.vue';
import {
  usePersonaByNumeroDocumentoQuery,
  useTipoDocumentoFetchAllQuery,
} from 'core/persona';
import PersonaCreateForm from 'core/persona/components/PersonaCreateForm.vue';
import PersonaEditForm from 'core/persona/components/PersonaEditForm.vue';
import BaseInput from 'shared/components/base/BaseInput.vue';
import BasePage from 'shared/components/base/BasePage.vue';
import BaseSelect from 'shared/components/base/BaseSelect.vue';
import Swal from 'sweetalert2';
import { useForm } from 'vee-validate';
import { computed, ref } from 'vue';
import { number, object } from 'yup';
import DiagnosticoCreateForm from '../components/DiagnosticoCreateForm.vue';
import DiagnosticoEditForm from '../components/DiagnosticoEditForm.vue';
import DiagnosticosListModal from '../components/DiagnosticosListModal.vue';
import { useFetchDiagnosticoByIdQuery } from '../composables';

const { data: tipo_documentos } = useTipoDocumentoFetchAllQuery();
const isPacienteFormVisible = ref(false);
const isDiagnosticoFormVisible = ref(false);
const isControlFormVisible = ref(false);
const arr_tipo_documentos = computed(() => {
  if (tipo_documentos.value) {
    return tipo_documentos.value.map((val) => {
      return {
        label: val.nombre,
        value: val.id,
      };
    });
  }
  return [];
});
const validationSchema = object().shape({
  numero_documento: number()
    .typeError('Debe ingresar un número')
    .min(8)
    .required()
    .label('Número de Documento'),
  tipo_documento_id: number().required().label('Tipo de Documento'),
});
const { handleSubmit, resetForm } = useForm<{ numero_documento: number }>({
  validationSchema,
});

const {
  fetch,
  fetchDiagnosticos,
  persona,
  isLoading,
  diagnosticos,
  isDiagnosticosEmpty,
} = usePersonaByNumeroDocumentoQuery();

const onSubmit = handleSubmit(async (values) => {
  onCancelPersonaForm();
  await fetch(values.numero_documento);

  if (persona.value) {
    Swal.fire({
      title: 'Exito!',
      text: 'Paciente encontrado correctamente!',
      icon: 'success',
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        if (!isDiagnosticosEmpty.value) {
          isModalOpen.value = true;
        }
      }
    });
  } else {
    Swal.fire({
      title: 'Error!',
      text: 'No se encontro el paciente indicado!',
      icon: 'warning',
    });
  }
});
const isModalOpen = ref(false);
const onCancelPersonaForm = () => {
  diagnostico.value = undefined;
  persona.value = undefined;
  isPacienteFormVisible.value = false;
  isDiagnosticoFormVisible.value = false;
  onCancelDiagnosticoForm();
  resetForm();
};
const onSubmitPersonaCreateForm = async (numero_documento: number) => {
  onCancelPersonaForm();
  await fetch(numero_documento);
};

// Diagnostico
const onSubmitDiagnosticoCreateForm = async (paciente_id: string) => {
  onCancelDiagnosticoForm();
  await fetchDiagnosticos(paciente_id);
};

const {
  diagnostico,
  isControlesEmpty,
  controles,
  fetchControles,
  fetch: fetchSelectedDiagnostico,
} = useFetchDiagnosticoByIdQuery();
const onSelectedDiagnostico = async (id: string) => {
  await fetchSelectedDiagnostico(id);
  isModalOpen.value = false;
};
const onAddDiagnostico = async () => {
  onCancelDiagnosticoForm();
  isModalOpen.value = false;
  isDiagnosticoFormVisible.value = true;
};

const onCancelDiagnosticoForm = () => {
  diagnostico.value = undefined;
  isDiagnosticoFormVisible.value = false;
  onCancelControlForm();
};

//Control
const { control, fetch: fetchControlById } = useFetchControlByIdQuery();

const onCancelControlForm = () => {
  control.value = undefined;
  isControlFormVisible.value = false;
};
const onSubmitControlCreateForm = async (diagnostico_id: string) => {
  onCancelControlForm();
  await fetchControles(diagnostico_id);
};

const onEditControl = async (id: string) => {
  control.value = undefined;
  await fetchControlById(id);
};
const onViewControlModal = async (id: string) => {
  control.value = undefined;
  await fetchControlById(id);
};
</script>

<style scoped></style>
