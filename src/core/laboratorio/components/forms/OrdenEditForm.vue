<template>
  <base-form :loading="isLoading" @submit="onSubmit" @cancel="$emit('cancel')">
    <base-input
      name="numero_orden"
      label="Numero de Orden"
      class="col-xs-12 col-sm-6"
      required
    />
    <base-input
      name="medico"
      label="Medico"
      class="col-xs-12 col-sm-6"
      required
    />
    <base-select
      v-if="esInstitucional"
      :options="arr_establecimientos"
      name="establecimiento_id"
      class="col-xs-12 col-sm-6"
      label="Establecimiento Institucional"
      :loading="false"
      required
    >
      <template #after>
        <q-btn
          round
          flat
          icon="fas fa-building-circle-arrow-right"
          color="primary"
          @click="esInstitucional = false"
        >
          <q-tooltip> Otro establecimiento </q-tooltip>
        </q-btn>
      </template>
    </base-select>
    <base-input
      v-else
      name="establecimiento_otro"
      label="Otro establecimiento"
      class="col-xs-12 col-sm-6"
      required
    >
      <template #after>
        <q-btn
          round
          flat
          icon="fas fa-building-circle-xmark"
          color="negative"
          @click="esInstitucional = true"
        >
          <q-tooltip> Establecimiento institucional</q-tooltip>
        </q-btn>
      </template>
    </base-input>
    <base-input
      name="diagnostico"
      label="Diagnostico"
      class="col-xs-12 col-sm-6"
      required
    />
    <base-input name="CI10" label="CI10" class="col-xs-12 col-sm-4" />
    <base-input
      name="CPN"
      label="Codigo Pre Natal"
      class="col-xs-12 col-sm-4"
    />
    <base-input name="EG" label="Edad Gestacional" class="col-xs-12 col-sm-4" />
    <base-input
      name="codigo_atencion"
      label="Codigo de Atención"
      class="col-xs-12 col-sm-4"
      required
    />
    <base-input
      name="fecha_registro"
      label="Fecha de Registro"
      class="col-xs-12 col-sm-4"
      type="date"
      required
    />
    <div class="col-12"><q-separator spaced /> Paquetes</div>
    <div class="col-12">
      <base-check-box-group
        name="paquete_ids"
        label="Paquetes"
        :options="arr_paquetes"
        @update="onUpdatePaquetes"
      />
    </div>
    <div class="col-12 row q-col-gutter-sm">
      <examen-card-list v-if="examens" :examens="examens" />
    </div>
  </base-form>
</template>

<script setup lang="ts">
import { useEstablecimientoFetchAllQuery } from 'core/establecimiento';
import { useExamenFetchAllQuery } from 'core/examen';
import {
  Orden,
  OrdenCreateRequest,
  useOrdenUpdateMutation,
} from 'core/laboratorio';
import { usePaqueteFetchAllQuery } from 'core/paquete';
import ExamenCardList from 'core/paquete/components/cards/ExamenCardList.vue';
import BaseCheckBoxGroup from 'shared/components/base/BaseCheckBoxGroup.vue';
import BaseForm from 'shared/components/base/BaseForm.vue';
import BaseInput from 'shared/components/base/BaseInput.vue';
import BaseSelect from 'shared/components/base/BaseSelect.vue';
import { NotifyUtils, Query } from 'shared/utils';
import { useForm } from 'vee-validate';
import { PropType, computed, ref, watch } from 'vue';
import { array, number, object, string } from 'yup';

const props = defineProps({
  orden: {
    type: Object as PropType<Orden>,
    required: true,
  },
});
const emit = defineEmits<{
  (e: 'submit'): void;
  (e: 'cancel'): void;
}>();

const query = ref<Query>({
  limit: 0,
  search: 'is_active:1',
  searchJoin: 'and',
});
const { data: examens } = useExamenFetchAllQuery(query);

const { data: paquetes } = usePaqueteFetchAllQuery();
const arr_paquetes = computed(() => {
  if (paquetes.value) {
    return paquetes.value.map((val) => {
      return {
        label: val.nombre,
        value: Number(val.id),
      };
    });
  }
  return [];
});

const queryEstablecimiento = ref<Query>({ limit: 0 });
const { data: establecimientos } =
  useEstablecimientoFetchAllQuery(queryEstablecimiento);

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
  CI10: string().trim().min(2).nullable().label('CI10'),
  CPN: string().trim().min(2).nullable().label('CPN'),
  EG: string().trim().min(2).nullable().label('EG'),
  codigo_atencion: string()
    .trim()
    .min(2)
    .required()
    .label('Codigo de Atencion'),
  numero_orden: number()
    .required()
    .typeError('Debe ingresar un numero')
    .positive()
    .integer()
    .label('Numero de Orden'),
  fecha_registro: string().trim().required().label('Fecha de Registro'),
  medico: string().trim().required().label('Médico'),
  examen_ids: array().of(number().required()).required().label('Examenes'),
  item_ids: array().of(number().required()).required().label('Items'),
  paquete_ids: array().of(number().required()).required().label('Paquetes'),
  establecimiento_id: number()
    .when([], {
      is: () => esInstitucional.value === true,
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.nullable(),
    })
    .label('Establecimiento Institucional'),
  establecimiento_otro: string()
    .when([], {
      is: () => esInstitucional.value === false,
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.nullable(),
    })
    .label('Otro Establecimiento'),
});

const { values, setFieldValue, handleSubmit } = useForm<OrdenCreateRequest>({
  validationSchema,
  initialValues: { ...props.orden, paquete_ids: [] },
});

const esInstitucional = ref<boolean>(!!props.orden.establecimiento_id);

const { mutateAsync, reset, isLoading } = useOrdenUpdateMutation();
const onSubmit = handleSubmit(
  async (values, { setErrors, resetForm }) => {
    await mutateAsync(
      { id: props.orden.id, data: values },
      {
        onSuccess: () => {
          NotifyUtils.success('Orden Actualizada correctamente.');
          resetForm();
          emit('submit');
        },
        onError: (err) => {
          reset.value();
          setErrors(err.data.errors);
        },
      }
    );
  },
  (v) => {
    console.log(v);
  }
);

// Watcher de examenes a paquetes
watch(
  () => values.examen_ids,
  (newValue) => {
    // Encuentra los paquetes que contienen todos los exámenes seleccionados
    if (!!newValue) {
      const selectedPackages = paquetes.value?.filter((paquete) =>
        paquete.examen_ids.every((examen) => newValue.includes(examen))
      );
      setFieldValue(
        'paquete_ids',
        selectedPackages?.map((paquete) => Number(paquete.id)) || []
      );
      // Buscar sus subexamenes o Items
      let item_ids: number[] = [];
      if (examens.value) {
        item_ids = [];
        newValue.forEach((examen) => {
          const examenEncontrado = examens.value.find(
            (e) => Number(e.id) === examen
          );
          if (examenEncontrado && examenEncontrado.items.data.length > 0) {
            const items = examenEncontrado.items.data.map((exa) =>
              Number(exa.id)
            );

            item_ids.push(...items);
          }
        });
        setFieldValue('item_ids', [...new Set(item_ids)]);
        console.log(values.item_ids);
      }
    }
  }
);

const onUpdatePaquetes = (paqueteIds: number[]) => {
  if (!!paqueteIds) {
    const selectedExams = paquetes.value
      ?.filter((paquete) => paqueteIds.includes(Number(paquete.id)))
      .map((paquete) => paquete.examen_ids)
      .flat();
    // Elimina duplicados y actualiza examen_ids
    setFieldValue('examen_ids', [...new Set(selectedExams)]);
  }
};
</script>
