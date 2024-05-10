<template>
  <div class="row">
    <base-form
      class="col-xs-12 col-sm-10"
      :loading="isLoading"
      @submit="onSubmit"
      @cancel="$emit('cancel')"
    >
      <base-select
        :options="arr_examens"
        name="examen_id"
        label="Examen"
        class="col-12"
      />
      <base-select
        :options="arr_secciones"
        name="seccion_id"
        label="Seccion"
        class="col-xs-12 col-sm-6"
      />
      <base-input name="codigo" label="Codigo" class="col-xs-12 col-sm-6" />
      <base-input name="nombre" label="Nombre" class="col-xs-12 col-sm-6" />
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
                <base-select
                  label="Unidades"
                  :name="`pivot[${index}].unidad_id`"
                  :options="arr_unidades"
                  class="col-2"
                  required
                />
                <base-select
                  v-if="values.pivot[index].tipo === 'operador'"
                  :name="`pivot[${index}].operador`"
                  :options="arr_operadores"
                  label="Operador"
                  class="col-3"
                />
                <base-input
                  :name="`pivot[${index}].minimo`"
                  :label="
                    values.pivot[index].tipo === 'multivalor'
                      ? 'Minimo'
                      : 'Valor'
                  "
                  class="col-3"
                />
                <base-input
                  v-if="values.pivot[index].tipo === 'multivalor'"
                  :name="`pivot[${index}].maximo`"
                  label="Maximo"
                  class="col-3"
                />
                <base-select
                  :options="arr_unidad_tipos"
                  :name="`pivot[${index}].tipo`"
                  label="Tipo"
                  class="col-3"
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
import { useExamenFetchAllQuery, useTipoFetchAllQuery } from 'core/examen';
import { ItemRequest, useItemCreateMutation } from 'core/item';
import { useRespuestaFetchAllQuery } from 'core/respuesta';
import { useSeccionFetchAllQuery } from 'core/seccion';
import {
  useOperadoresFetchAllQuery,
  useUnidadFetchAllQuery,
  useUnidadTiposFetchAllQuery,
} from 'core/unidad';
import BaseForm from 'shared/components/base/BaseForm.vue';
import BaseInput from 'shared/components/base/BaseInput.vue';
import BaseSelect from 'shared/components/base/BaseSelect.vue';
import { NotifyUtils, QSelectOptions, Query } from 'shared/utils';
import { useFieldArray, useForm } from 'vee-validate';
import { computed, ref } from 'vue';
import { array, number, object, string } from 'yup';

const emit = defineEmits<{
  submit: [];
  cancel: [];
}>();

const { data: secciones } = useSeccionFetchAllQuery();

const arr_secciones = computed(() => {
  if (secciones.value) {
    return secciones.value.map((val) => {
      return {
        label: val.nombre,
        value: Number(val.id),
      };
    });
  }
  return [];
});

const queryExamens = ref<Query>({
  limit: 0,
  search: 'is_active:1',
  searchJoin: 'and',
});
const { data: examens } = useExamenFetchAllQuery(queryExamens);

const arr_examens = computed(() => {
  if (examens.value) {
    return examens.value.map((val) => {
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

const { data: unidad_tipos } = useUnidadTiposFetchAllQuery();

const arr_unidad_tipos = computed(() => {
  if (unidad_tipos.value) {
    return Object.values(unidad_tipos.value).map((val) => {
      return {
        label: val,
        value: val,
      };
    });
  }
  return [];
});

const { data: operadores } = useOperadoresFetchAllQuery();

const arr_operadores = computed(() => {
  if (operadores.value) {
    return Object.entries(operadores.value).map(([key, val]) => {
      return {
        label: `${val} (${key})`,
        value: key,
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
  seccion_id: number().required().label('Seccion'),
  examen_id: number().required().label('Examen'),
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
          .when(['tipo'], {
            is: (tipo: string) => tipo === 'multivalor',
            then: (schema) => schema.required(),
            otherwise: (schema) => schema.nullable(),
          })
          // .required()
          .label('Maximo'),
        tipo: string().required().label('Tipo'),
        operador: string()
          .when(['tipo'], {
            is: (tipo: string) => tipo === 'operador',
            then: (schema) => schema.required(),
            otherwise: (schema) => schema.nullable(),
          })
          .label('Operador'),
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

const { handleSubmit, setErrors, values, errors } = useForm<ItemRequest>({
  validationSchema,
  // initialValues: { pivot: [] },
});

const selectUnidad = ref<QSelectOptions>();
const selectRespuesta = ref<QSelectOptions>();

const {
  remove: removeUnidad,
  push: pushUnidad,
  fields: fieldsUnidades,
} = useFieldArray<{
  item_id?: number;
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

const { isLoading, mutate, reset } = useItemCreateMutation();

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
</script>
