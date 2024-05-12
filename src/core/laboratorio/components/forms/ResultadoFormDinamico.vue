<template>
  <q-form @submit.prevent="onSubmit">
    <!-- <pre>{{ values }}</pre> -->
    <q-list dense>
      <q-item v-for="(examen, index) in examens" :key="index" dense>
        <q-item-section>
          <div class="row q-col-gutter-sm q-mb-sm">
            <base-select
              label="Examen"
              :name="`pivot[${index}].examen_id`"
              :options="arr_examens"
              class="col-4"
              required
              borderless
              readonly
              :outlined="false"
            />
            <!-- SI ES STRING -->
            <div
              v-if="examen.tipo.toLowerCase() === 'string'"
              class="col-4 row q-col-gutter-sm"
            >
              <base-input
                v-if="!values.pivot[index].is_canceled"
                :name="`pivot[${index}].resultado`"
                :bg-color="calcularColorResultado(index)"
                label="Resultado"
                class="col-12"
                required
                :disable="!values.pivot[index].is_enabled"
              />
              <base-input
                v-if="values.pivot[index].is_canceled"
                :name="`pivot[${index}].motivo`"
                label="Motivo"
                class="col-12"
                required
                :disable="!values.pivot[index].is_enabled"
              />
            </div>
            <!-- SI ES NUMBER -->
            <div
              v-else-if="examen.tipo.toLowerCase() === 'unidad'"
              class="col-4 row q-col-gutter-sm"
            >
              <base-input
                v-if="!values.pivot[index].is_canceled"
                :name="`pivot[${index}].resultado`"
                :bg-color="calcularColorResultado(index)"
                label="Resultado"
                class="col-6"
                required
                :disable="!values.pivot[index].is_enabled"
              />
              <base-select
                v-if="
                  !values.pivot[index].is_canceled &&
                  !values.pivot[index].has_items
                "
                label="Unidad"
                :name="`pivot[${index}].unidad_id`"
                :options="values.pivot[index].unidads"
                :hint="calcularHintUnidad(index)"
                class="col-6"
                required
                :disable="!values.pivot[index].is_enabled"
              />
              <base-input
                v-if="values.pivot[index].is_canceled"
                :name="`pivot[${index}].motivo`"
                label="Motivo"
                class="col-12"
                required
                :disable="!values.pivot[index].is_enabled"
              />
            </div>
            <div
              v-else-if="examen.tipo.toLowerCase() === 'respuesta'"
              class="col-4 row q-col-gutter-sm"
            >
              <base-select
                v-if="!values.pivot[index].is_canceled"
                label="Respuesta"
                :name="`pivot[${index}].respuesta_id`"
                :options="values.pivot[index].respuestas"
                class="col-12"
                required
                :disable="!values.pivot[index].is_enabled"
              />
              <base-input
                v-if="values.pivot[index].is_canceled"
                :name="`pivot[${index}].motivo`"
                label="Motivo"
                class="col-12"
                required
                :disable="!values.pivot[index].is_enabled"
              />
            </div>

            <base-input
              label="Fecha"
              type="date"
              :name="`pivot[${index}].fecha_resultado`"
              required
              class="col-2"
              :disable="!values.pivot[index].is_enabled"
            />
            <q-card-actions class="col-2 self-center justify-center">
              <base-check-box
                :name="`pivot[${index}].is_enabled`"
                label=""
                dense
              >
                <q-tooltip>
                  {{
                    values.pivot[index].is_enabled
                      ? 'Deshabilitar.'
                      : 'Habilitar.'
                  }}
                </q-tooltip>
              </base-check-box>
              <q-btn
                :icon="
                  values.pivot[index].is_canceled ? 'fas fa-pen' : 'fas fa-ban'
                "
                :color="
                  values.pivot[index].is_canceled ? 'warning' : 'negative'
                "
                :disable="!values.pivot[index].is_enabled"
                round
                flat
                size="sm"
                @click="cancelarExamen(index)"
              >
                <q-tooltip>{{
                  values.pivot[index].is_canceled
                    ? 'Registrar datos.'
                    : 'Cancelar examen.'
                }}</q-tooltip>
              </q-btn>
            </q-card-actions>
          </div>
          <q-list
            v-show="
              values.pivot[index].is_enabled && !values.pivot[index].is_canceled
            "
            dense
          >
            <q-item v-for="(_, i) in values.pivot[index].items" :key="i" dense>
              <q-item-section>
                <div class="row q-col-gutter-sm q-mb-sm">
                  <base-select
                    label="Item"
                    :name="`item_orden[${_.pivot_index}].item_id`"
                    :options="arr_items"
                    class="col-4"
                    required
                    borderless
                    readonly
                    :outlined="false"
                  />
                  <base-input
                    v-if="values.item_orden[_.pivot_index].tipo !== 'respuesta'"
                    :name="`item_orden[${_.pivot_index}].resultado`"
                    label="Resultado"
                    :class="
                      values.item_orden[_.pivot_index].tipo === 'unidad'
                        ? 'col-2'
                        : 'col-4'
                    "
                    required
                    :disable="!values.pivot[index].is_enabled"
                    :bg-color="calcularColorResultadoItem(_.pivot_index)"
                  />

                  <base-select
                    v-if="values.item_orden[_.pivot_index].tipo === 'unidad'"
                    label="Unidad"
                    :name="`item_orden[${_.pivot_index}].unidad_id`"
                    :options="values.item_orden[_.pivot_index].unidads"
                    class="col-2"
                    required
                    :disable="!values.pivot[index].is_enabled"
                  />
                  <base-select
                    v-if="values.item_orden[_.pivot_index].tipo === 'respuesta'"
                    label="Respuesta"
                    :name="`item_orden[${_.pivot_index}].respuesta_id`"
                    :options="values.item_orden[_.pivot_index].respuestas"
                    class="col-4"
                    required
                    :disable="!values.pivot[index].is_enabled"
                  />
                  <span class="col-auto text-center self-center text-caption">
                    {{ calcularHintUnidadItem(index) }}
                  </span>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-item-section>
      </q-item>
    </q-list>
    <!-- OBSERVACIONES -->
    <div v-if="withObservaciones" class="row q-mt-md">
      <base-input
        label="Observaciones"
        type="textarea"
        name="observaciones"
        class="col-12"
      />
    </div>
    <div class="row">
      <q-card-actions class="col-12 justify-end q-pa-none q-pt-md">
        <q-btn
          label="Cancelar"
          color="primary"
          no-caps
          outline
          @click="$emit('cancel')"
        />
        <q-btn
          label="Guardar"
          type="submit"
          icon="fas fa-floppy-disk"
          color="primary"
          :loading="isLoading"
          no-caps
        />
      </q-card-actions>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { Examen } from 'core/examen';
import { Item } from 'core/item';
import { useOrdenUpdateExamensMutation } from 'core/laboratorio/composables';
import { OrdenResultadosRequest } from 'core/laboratorio/requests';
import { Operadores } from 'core/unidad';
import BaseCheckBox from 'shared/components/base/BaseCheckBox.vue';
import BaseInput from 'shared/components/base/BaseInput.vue';
import BaseSelect from 'shared/components/base/BaseSelect.vue';
import { Field, NotifyUtils } from 'shared/utils';
import { useForm } from 'vee-validate';
import { PropType, computed, watch } from 'vue';
const emit = defineEmits<{
  (e: 'submit'): void;
  (e: 'cancel'): void;
}>();

const props = defineProps({
  fields: {
    type: Array<Field[]>,
    required: true,
  },
  examens: {
    type: Array<Examen>,
    required: true,
  },
  items: {
    type: Array<Item>,
    required: true,
  },
  ordenId: {
    type: Number,
    required: true,
  },
  initialValues: {
    type: Object,
    required: false,
    default: undefined,
  },
  validationSchema: {
    type: Object,
    required: true,
  },
  withObservaciones: {
    type: Boolean,
    required: true,
  },
  operadores: {
    type: Object as PropType<Operadores>,
    required: true,
  },
});

const arr_examens = computed(() => {
  if (props.examens) {
    return props.examens.map((val) => {
      return {
        label: val.nombre,
        value: Number(val.id),
      };
    });
  }
  return [];
});
const arr_items = computed(() => {
  return props.items.map((val) => {
    return {
      label: val.nombre,
      value: Number(val.id),
    };
  });
});

const { handleSubmit, setFieldValue, values } = useForm({
  validationSchema: props.validationSchema,
  initialValues: props.initialValues,
});

const { mutateAsync, reset, isLoading } = useOrdenUpdateExamensMutation();
const onSubmit = handleSubmit(
  async (values, { setErrors }) => {
    await mutateAsync(
      { id: props.ordenId, data: values as OrdenResultadosRequest },
      {
        onSuccess: () => {
          NotifyUtils.success('Resultados actualizados correctamente');
          emit('submit');
          reset.value();
        },
        onError: (err) => {
          reset.value();
          setErrors(err.data.errors);
        },
      }
    );
  },
  (e) => console.log(e)
);

// UNIDAD DEL EXAMEN
const calcularHintUnidad = (index: number) => {
  let str = undefined;

  if (values.pivot[index].tipo_unidad === '') {
  }

  switch (values.pivot[index].tipo_unidad) {
    case 'multivalor':
      if (!!values.pivot[index].minimo && !!values.pivot[index].maximo) {
        str = `Min: ${values.pivot[index].minimo} - Max: ${values.pivot[index].maximo}`;
      }
      break;
    case 'operador':
      if (
        !!values.pivot[index].minimo &&
        !!values.pivot[index].operador_unidad
      ) {
        str = `${values.pivot[index].operador_unidad} ${values.pivot[index].minimo}`;
      }
      break;
    case 'unico':
      if (!!values.pivot[index].minimo) {
        // str = 'Es unico';
      }
      break;

    default:
      str = undefined;
      break;
  }

  return str;
};
const calcularColorResultado = (index: number) => {
  let color = undefined;

  switch (values.pivot[index].tipo_unidad) {
    case 'multivalor':
      if (!!values.pivot[index].minimo && !!values.pivot[index].maximo) {
        if (
          values.pivot[index].resultado > values.pivot[index].minimo &&
          values.pivot[index].resultado < values.pivot[index].maximo
        ) {
          color = 'green-2';
        } else {
          color = 'red-2';
        }
      }
      break;
    case 'operador':
      if (
        !!values.pivot[index].minimo &&
        !!values.pivot[index].operador_unidad
      ) {
        switch (values.pivot[index].operador_unidad) {
          case '>':
            if (values.pivot[index].resultado > values.pivot[index].minimo) {
              color = 'green-2';
            } else {
              color = 'red-2';
            }
            break;
          case '>=':
            if (values.pivot[index].resultado >= values.pivot[index].minimo) {
              color = 'green-2';
            } else {
              color = 'red-2';
            }
            break;
          case '<':
            if (values.pivot[index].resultado < values.pivot[index].minimo) {
              color = 'green-2';
            } else {
              color = 'red-2';
            }
            break;
          case '<=':
            if (values.pivot[index].resultado <= values.pivot[index].minimo) {
              color = 'green-2';
            } else {
              color = 'red-2';
            }
            break;

          default:
            break;
        }
      }
      break;
    case 'unico':
      // NO SE QUE PONER ACA
      break;

    default:
      color = undefined;
      break;
  }

  return color;
};

// UNIDAD DEL ITEM
const calcularHintUnidadItem = (index: number) => {
  let str = undefined;

  if (values.item_orden[index].tipo_unidad === '') {
  }

  switch (values.item_orden[index].tipo_unidad) {
    case 'multivalor':
      if (
        !!values.item_orden[index].minimo &&
        !!values.item_orden[index].maximo
      ) {
        str = `Min: ${values.item_orden[index].minimo} - Max: ${values.item_orden[index].maximo}`;
      }
      break;
    case 'operador':
      if (
        !!values.item_orden[index].minimo &&
        !!values.item_orden[index].operador_unidad
      ) {
        const operador_nombre =
          props.operadores[
            values.item_orden[index]
              .operador_unidad as keyof PropType<Operadores>
          ];
        str = `${operador_nombre} ${values.item_orden[index].minimo}`;
      }
      break;
    case 'unico':
      if (!!values.item_orden[index].minimo) {
        // str = 'Es unico';
      }
      break;

    default:
      str = undefined;
      break;
  }

  return str;
};
const calcularColorResultadoItem = (index: number) => {
  let color = undefined;

  switch (values.item_orden[index].tipo_unidad) {
    case 'multivalor':
      if (
        !!values.item_orden[index].minimo &&
        !!values.item_orden[index].maximo
      ) {
        if (
          values.item_orden[index].resultado >
            values.item_orden[index].minimo &&
          values.item_orden[index].resultado < values.item_orden[index].maximo
        ) {
          color = 'green-2';
        } else {
          color = 'red-2';
        }
      }
      break;
    case 'operador':
      if (
        !!values.item_orden[index].minimo &&
        !!values.item_orden[index].operador_unidad
      ) {
        switch (values.item_orden[index].operador_unidad) {
          case '>':
            if (
              values.item_orden[index].resultado >
              values.item_orden[index].minimo
            ) {
              color = 'green-2';
            } else {
              color = 'red-2';
            }
            break;
          case '>=':
            if (
              values.item_orden[index].resultado >=
              values.item_orden[index].minimo
            ) {
              color = 'green-2';
            } else {
              color = 'red-2';
            }
            break;
          case '<':
            if (
              values.item_orden[index].resultado <
              values.item_orden[index].minimo
            ) {
              color = 'green-2';
            } else {
              color = 'red-2';
            }
            break;
          case '<=':
            if (
              values.item_orden[index].resultado <=
              values.item_orden[index].minimo
            ) {
              color = 'green-2';
            } else {
              color = 'red-2';
            }
            break;

          default:
            break;
        }
      }
      break;
    case 'unico':
      // NO SE QUE PONER ACA
      break;

    default:
      color = undefined;
      break;
  }

  return color;
};
const cancelarExamen = (index: number) => {
  const is_canceled = 'pivot[' + index + '].is_canceled';
  const valor = values.pivot[index].is_canceled;

  // Ignorar tambien los items de este examen...
  if (values.pivot[index].has_items) {
    const itemsDelExamen = values.pivot[index].items;
    itemsDelExamen.forEach((piv: { pivot_index: string }) => {
      const is_canceled_item =
        'item_orden[' + piv.pivot_index + '].is_canceled';
      setFieldValue(is_canceled_item, !valor);
    });
  }
  setFieldValue(is_canceled, !valor);
};

props.fields.forEach((_, index) => {
  watch(
    () => values.pivot[index].unidad_id,
    (newValue) => {
      if (newValue) {
        const examen = props.examens.find(
          (v) => v.id == values.pivot[index].examen_id
        );
        if (!!examen && !!newValue) {
          const piv = examen.pivot.find((v) => v.unidad_id === newValue);
          const minimo = 'pivot[' + index + '].minimo';
          const maximo = 'pivot[' + index + '].maximo';
          const tipo_unidad = 'pivot[' + index + '].tipo_unidad';
          const operador_unidad = 'pivot[' + index + '].operador_unidad';
          if (piv) {
            setFieldValue(minimo, piv.minimo);
            setFieldValue(maximo, piv.maximo);
            setFieldValue(tipo_unidad, piv.tipo);
            setFieldValue(operador_unidad, piv.operador);
          }
        }
      }
    },
    { deep: true, immediate: true }
  );
  watch(
    () => values.pivot[index].is_canceled,
    (newValue) => {
      const minimo = 'pivot[' + index + '].minimo';
      const maximo = 'pivot[' + index + '].maximo';
      const tipo_unidad = 'pivot[' + index + '].tipo_unidad';
      const operador_unidad = 'pivot[' + index + '].operador_unidad';
      if (newValue) {
        setFieldValue(minimo, undefined);
        setFieldValue(maximo, undefined);
        setFieldValue(tipo_unidad, undefined);
        setFieldValue(operador_unidad, undefined);
      }

      const itemsDelExamen = values.pivot[index].items;
      itemsDelExamen.forEach((piv: { pivot_index: string }) => {
        const is_canceled_item =
          'item_orden[' + piv.pivot_index + '].is_canceled';
        setFieldValue(is_canceled_item, newValue);
      });
    },
    { deep: true, immediate: true }
  );
  watch(
    () => values.pivot[index].is_enabled,
    (newValue) => {
      const minimo = 'pivot[' + index + '].minimo';
      const maximo = 'pivot[' + index + '].maximo';
      const resultado = 'pivot[' + index + '].resultado';
      const unidad_id = 'pivot[' + index + '].unidad_id';
      const motivo = 'pivot[' + index + '].motivo';
      if (!newValue) {
        setFieldValue(minimo, undefined);
        setFieldValue(maximo, undefined);
        setFieldValue(resultado, null);
        setFieldValue(unidad_id, null);
        setFieldValue(motivo, null);

        const itemsDelExamen = values.pivot[index].items;
        itemsDelExamen.forEach((piv: { pivot_index: string }) => {
          const is_enabled_item =
            'item_orden[' + piv.pivot_index + '].is_enabled';
          setFieldValue(is_enabled_item, newValue);
        });
      }
    },
    { deep: true, immediate: true }
  );
});

props.items.forEach((_, index) => {
  // console.log(_);
  // console.log(values.item_orden);
  watch(
    () => values.item_orden[index].unidad_id,
    (newValue) => {
      if (newValue) {
        const item = props.items.find(
          (v) => v.id == values.item_orden[index].item_id
        );
        if (!!item && !!newValue) {
          const piv = item.pivot.find((v) => v.unidad_id === newValue);
          const minimo = 'item_orden[' + index + '].minimo';
          const maximo = 'item_orden[' + index + '].maximo';
          const tipo_unidad = 'item_orden[' + index + '].tipo_unidad';
          const operador_unidad = 'item_orden[' + index + '].operador_unidad';
          if (piv) {
            setFieldValue(minimo, piv.minimo);
            setFieldValue(maximo, piv.maximo);
            setFieldValue(tipo_unidad, piv.tipo);
            setFieldValue(operador_unidad, piv.operador);
          }
        }
      }
    },
    { deep: true, immediate: true }
  );
});
</script>
