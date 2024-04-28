<template>
  <div class="row">
    <base-form
      class="col-xs-12 col-sm-10"
      :loading="isLoading"
      @submit="onSubmit"
      @cancel="$emit('cancel')"
    >
      <base-select
        :options="arr_categorias"
        name="categoria_id"
        label="Categoria"
        class="col-xs-12 col-sm-6"
      />
      <base-input name="codigo" label="Codigo" class="col-xs-12 col-sm-6" />
      <base-input name="nombre" label="Nombre" class="col-xs-12 col-sm-9" />
      <base-input name="precio" label="Precio" class="col-xs-12 col-sm-3" />
      <base-check-box
        name="is_active"
        label="¿Activo?"
        class="col-xs-12 col-sm-6"
      />
      <base-select
        :options="arr_tipos"
        name="tipo"
        label="Tipo"
        class="col-xs-12 col-sm-6"
      />

      <div v-if="values.tipo === 'unidad'" class="col-xs-12 col-sm-12">
        <div class="row">
          <q-select
            v-model="selectUnidad"
            :options="arr_unidades"
            borderless
            dense
            name="unidadees1"
            label="Unidades"
            class="col-4 q-mb-md"
          >
            <template #after>
              <q-btn
                :disable="!selectUnidad"
                round
                dense
                icon="add"
                color="positive"
                @click="pushSelectedUnidad(selectUnidad!)"
              />
            </template>
          </q-select>
        </div>
        <div v-if="errors.pivot" class="text-red text-italic">
          {{ errors.pivot }}
        </div>
        <q-list bordered>
          <q-item-label header>Seleccionar Unidades</q-item-label>

          <q-item v-for="(_, index) in fieldsUnidades" :key="index">
            <q-item-section>
              <div class="row q-col-gutter-sm q-mb-sm">
                <base-input
                  v-show="false"
                  label="examen"
                  :name="`pivot[${index}].examen_id`"
                  class="col-3"
                  required
                />
                <base-select
                  label="Unidades"
                  :name="`pivot[${index}].unidad_id`"
                  :options="arr_unidades"
                  class="col-3"
                  required
                />
                <base-input
                  :name="`pivot[${index}].minimo`"
                  label="Minimo"
                  class="col-4"
                />
                <base-input
                  :name="`pivot[${index}].maximo`"
                  label="Maximo"
                  class="col-4"
                />
                <div class="col-auto self-center">
                  <q-btn
                    icon="fas fa-trash-can"
                    color="negative"
                    round
                    flat
                    size="sm"
                    @click="removeUnidad(index)"
                  />
                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div v-if="values.tipo === 'respuesta'" class="col-xs-12 col-sm-12">
        <div class="row">
          <q-select
            v-model="selectRespuesta"
            :options="arr_respuestas"
            borderless
            dense
            name="respuestas1"
            label="Respuesta"
            class="col-4 q-mb-md"
          >
            <template #after>
              <q-btn
                :disable="!selectRespuesta"
                round
                dense
                icon="add"
                color="positive"
                @click="pushSelectedRespuesta(selectRespuesta!)"
              />
            </template>
          </q-select>
        </div>
        <div v-if="errors.respuesta_ids" class="text-red text-italic">
          {{ errors.respuesta_ids }}
        </div>
        <q-list bordered>
          <q-item-label header>Seleccionar Respuestas</q-item-label>
          <q-item v-for="(_, index) in fieldsRespuesta" :key="index">
            <q-item-section>
              <div class="row q-col-gutter-sm q-mb-sm">
                <base-select
                  label="Respuesta"
                  :name="`respuesta_ids[${index}]`"
                  :options="arr_respuestas"
                  class="col-8"
                  required
                />
                <div class="col-4 self-center">
                  <q-btn
                    icon="fas fa-trash-can"
                    color="negative"
                    round
                    flat
                    size="sm"
                    @click="removeRespuesta(index)"
                  />
                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </base-form>
  </div>
</template>

<script setup lang="ts">
import {
  Examen,
  ExamenRequest,
  useCategoriaFetchAllQuery,
  useExamenUpdateMutation,
  useTipoFetchAllQuery,
} from 'core/examen';
import { useRespuestaFetchAllQuery } from 'core/respuesta';
import { useUnidadFetchAllQuery } from 'core/unidad';
import BaseCheckBox from 'shared/components/base/BaseCheckBox.vue';
import BaseForm from 'shared/components/base/BaseForm.vue';
import BaseInput from 'shared/components/base/BaseInput.vue';
import BaseSelect from 'shared/components/base/BaseSelect.vue';
import { NotifyUtils, QSelectOptions } from 'shared/utils';
import { useFieldArray, useForm } from 'vee-validate';
import { PropType, computed, ref } from 'vue';
import { array, boolean, number, object, string } from 'yup';

const props = defineProps({
  examen: {
    type: Object as PropType<Examen>,
    required: true,
  },
});
const emit = defineEmits<{
  submit: [];
  cancel: [];
}>();

const { data: categorias } = useCategoriaFetchAllQuery();

const arr_categorias = computed(() => {
  if (categorias.value) {
    return categorias.value.map((val) => {
      return {
        label: val.nombre,
        value: Number(val.id),
      };
    });
  }
  return [];
});

const { data: tipos } = useTipoFetchAllQuery();

const arr_tipos = computed(() => {
  if (tipos.value) {
    return Object.values(tipos.value).map((val) => {
      return {
        label: val,
        value: val,
      };
    });
  }
  return [];
});
const { data: unidades } = useUnidadFetchAllQuery();

const arr_unidades = computed(() => {
  if (unidades.value) {
    return Object.values(unidades.value).map((val) => {
      return {
        label: val.nombre,
        value: Number(val.id),
      };
    });
  }
  return [];
});
const { data: respuestas } = useRespuestaFetchAllQuery();

const arr_respuestas = computed(() => {
  if (respuestas.value) {
    return Object.values(respuestas.value).map((val) => {
      return {
        label: val.nombre,
        value: Number(val.id),
      };
    });
  }
  return [];
});

const selectUnidad = ref<QSelectOptions>();
const selectRespuesta = ref<QSelectOptions>();

const validationSchema = object().shape({
  nombre: string().trim().min(2).required().label('Nombre'),
  codigo: number()
    .typeError('Codigo debe ser un numero')
    .positive()
    .required()
    .label('Codigo'),
  tipo: string().trim().min(2).required().label('Tipo'),
  categoria_id: number().required().label('Categoria'),
  is_active: boolean().required().label('¿Activo?'),
  precio: number()
    .typeError('Precio debe ser un numero')
    .positive()
    .required()
    .label('Precio'),
  pivot: array()
    .when(['tipo'], {
      is: (tipo: string) => tipo === 'unidad',
      then: (schema) => schema.required().min(1),
      otherwise: (schema) => schema.nullable(),
    })
    .of(
      object({
        unidad_id: number()
          .typeError('Unidad debe ser un numero')
          .positive()
          .required()
          .label('Unidad'),
        examen_id: number()
          .typeError('Examen debe ser un numero')
          .positive()
          .label('Examen'),
        minimo: number()
          .typeError('Minimo debe ser un numero')
          .positive()
          .required()
          .label('Minimo'),
        maximo: number()
          .typeError('Maximo debe ser un numero')
          .positive()
          .required()
          .label('Maximo'),
      })
    )
    .label('Unidades'),
  respuesta_ids: array()
    .when(['tipo'], {
      is: (tipo: string) => tipo === 'respuesta',
      then: (schema) => schema.required().min(1),
      otherwise: (schema) => schema.nullable(),
    })
    .of(number().required())
    .label('Respuestas'),
});

const { handleSubmit, setErrors, values, errors } = useForm<ExamenRequest>({
  validationSchema,
  initialValues: { ...props.examen },
});
const {
  remove: removeUnidad,
  push: pushUnidad,
  fields: fieldsUnidades,
} = useFieldArray<{
  examen_id?: number;
  unidad_id?: number;
  minimo?: number;
  maximo?: number;
}>('pivot');
const {
  remove: removeRespuesta,
  push: pushRespuesta,
  fields: fieldsRespuesta,
} = useFieldArray<number | undefined>('respuesta_ids');

const pushSelectedUnidad = (data: QSelectOptions) => {
  const exists = fieldsUnidades.value.some(
    (item) => item.value.unidad_id === data.value
  );
  if (exists) {
    NotifyUtils.warn('Ya has agregado este item');
    return;
  }
  pushUnidad({ unidad_id: Number(data.value) });
  selectUnidad.value = undefined;
};

const pushSelectedRespuesta = (data: QSelectOptions) => {
  const exists = fieldsRespuesta.value.some(
    (item) => item.value === data.value
  );
  if (exists) {
    NotifyUtils.warn('Ya has agregado este item');
    return;
  }
  pushRespuesta(Number(data.value));
  selectRespuesta.value = undefined;
};

const { isLoading, mutate, reset } = useExamenUpdateMutation();
const onSubmit = handleSubmit(
  async (values) => {
    mutate(
      { data: values, id: props.examen.id },
      {
        onSuccess: () => {
          emit('submit');
        },
        onError: (err) => {
          reset.value();
          setErrors(err.data.errors);
        },
      }
    );
  },
  (err) => {
    console.log(err.errors);
  }
);
</script>
