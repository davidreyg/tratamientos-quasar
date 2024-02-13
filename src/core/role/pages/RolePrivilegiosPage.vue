<template>
  <div class="row">
    <q-card v-if="isFetching" class="col-12 q-pa-lg">
      loading...
      <!-- <skeleton-form class="col-12" :inputs="2" /> -->
    </q-card>
    <div
      v-if="isSuccess && !isFetching && data"
      class="col-12 row q-col-gutter-sm"
    >
      <q-card-actions align="center">
        <!-- <q-btn
          label="Cancelar"
          color="primary"
          no-caps
          outline
          @click="$emit('cancel')"
        /> -->
        <q-btn
          label="Guardar"
          icon="fas fa-floppy-disk"
          color="primary"
          no-caps
          :loading="isLoading"
          @click="syncRolePrivilegios"
        />
      </q-card-actions>
      <q-tree
        v-model:ticked="ticked"
        class="col-12"
        tick-strategy="strict"
        :nodes="xd"
        node-key="id"
        label-key="nombre"
        default-expand-all
      >
        <template #default-header="prop">
          <div class="row items-center q-ml-sm">
            <q-icon :name="prop.node.icono" class="q-mr-sm" />
            <div class="">
              {{ prop.node.nombre }}
            </div>
          </div>
        </template>
        <template #default-body="prop">
          <div v-if="prop.node.parent_id != null">
            <span class="text-weight-thin">Ruta: {{ prop.node.ruta }}</span>
          </div>
        </template>
      </q-tree>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePrivilegioFetchAllQuery } from 'core/privilegio/composables';
import { arrayToTree } from 'performant-array-to-tree';
import { NotifyUtils } from 'shared/utils';
import { computed, ref, watch } from 'vue';
import { useRoleSyncPrivilegiosMutation } from '../composables';
import { useRoleFetchPrivilegiosQuery } from '../composables/roleFetchPrivilegiosQuery';

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const { data, isSuccess, isFetching } = usePrivilegioFetchAllQuery();
const { data: privilegiosDelRol } = useRoleFetchPrivilegiosQuery(
  props.id,
  !!data.value
);
const ticked = ref<string[]>([]);
const xd = computed(() => {
  if (data.value) {
    return arrayToTree(data.value, { parentId: 'parent_id', dataField: null });
  } else {
    return [];
  }
});

const { mutate, isLoading } = useRoleSyncPrivilegiosMutation();

const syncRolePrivilegios = () => {
  mutate(
    { data: ticked.value, id: props.id },
    {
      onSuccess: () => {
        NotifyUtils.success('Privilegios otorgados correctamente');
        // emit('submit', props.diagnosticoId);
      },
      onError: (err) => {
        console.log(err);
        // setErrors(err.data.errors);
      },
    }
  );
};
watch(
  () => privilegiosDelRol.value,
  (newValue) => {
    if (newValue) {
      ticked.value = newValue.map((v) => v.id.toString());
    }
  },
  { immediate: true }
);
</script>
