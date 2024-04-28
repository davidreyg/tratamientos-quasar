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
        <q-btn
          color="primary"
          icon="add"
          label="Agregar"
          no-caps
          class="q-mb-md"
          @click="pushUnidad(undefined)"
        />
        <div v-if="errors.pivot" class="text-red text-italic">
          {{ errors.pivot }}
        </div>
        <q-list bordered>
          <q-item-label header>Seleccionar Unidades</q-item-label>

          <q-item v-for="(_, index) in fieldsUnidades" :key="index">
            <q-item-section>
              <div class="row q-col-gutter-sm q-mb-sm">
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
        <q-btn
          color="primary"
          icon="add"
          label="Agregar"
          no-caps
          class="q-mb-md"
          @click="pushRespuesta(undefined)"
        />
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
  ExamenRequest,
  useCategoriaFetchAllQuery,
  useExamenCreateMutation,
  useTipoFetchAllQuery,
} from 'core/examen';
import { useRespuestaFetchAllQuery } from 'core/respuesta';
import { useUnidadFetchAllQuery } from 'core/unidad';
import BaseCheckBox from 'shared/components/base/BaseCheckBox.vue';
import BaseForm from 'shared/components/base/BaseForm.vue';
import BaseInput from 'shared/components/base/BaseInput.vue';
import BaseSelect from 'shared/components/base/BaseSelect.vue';
import { NotifyUtils } from 'shared/utils';
import { useFieldArray, useForm } from 'vee-validate';
import { computed } from 'vue';
import { array, boolean, number, object, string } from 'yup';

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
  // initialValues: { pivot: [] },
});
const {
  remove: removeUnidad,
  push: pushUnidad,
  fields: fieldsUnidades,
} = useFieldArray<
  | {
      unidad_id: number;
      minimo: number;
      maximo: number;
    }
  | undefined
>('pivot');
const {
  remove: removeRespuesta,
  push: pushRespuesta,
  fields: fieldsRespuesta,
} = useFieldArray<
  | {
      unidad_id: number;
      minimo: number;
      maximo: number;
    }
  | undefined
>('respuesta_ids');
const { isLoading, mutate, reset } = useExamenCreateMutation();

const onSubmit = handleSubmit(
  async (values) => {
    mutate(values, {
      onSuccess: () => {
        NotifyUtils.success();
        emit('submit');
      },
      onError: (err) => {
        reset.value();
        setErrors(err.data.errors);
      },
    });
  },
  (err) => {
    console.log(err.errors);
  }
);

// watch(() => values.tipo, (newValue) => {

//   if (newValue) {

//   }
// })
</script>
