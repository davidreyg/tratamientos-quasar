<template>
  <q-form @submit.prevent="onSubmit">
    <!-- <pre>{{ values }}</pre> -->
    <q-list bordered>
      <q-item v-for="(examen, index) in examens" :key="index">
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
            bordered
          >
            <q-item v-for="(_, i) in values.pivot[index].items" :key="i">
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
                    :name="`item_orden[${_.pivot_index}].resultado`"
                    label="Resultado"
                    class="col-2"
                    required
                    :disable="!values.pivot[index].is_enabled"
                  />

                  <base-select
                    label="Unidad"
                    :name="`item_orden[${_.pivot_index}].unidad_id`"
                    :options="values.item_orden[_.pivot_index].unidads"
                    class="col-2"
                    required
                    :disable="!values.pivot[index].is_enabled"
                  />
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
import BaseCheckBox from 'shared/components/base/BaseCheckBox.vue';
import BaseInput from 'shared/components/base/BaseInput.vue';
import BaseSelect from 'shared/components/base/BaseSelect.vue';
import { Field, NotifyUtils } from 'shared/utils';
import { useForm } from 'vee-validate';
import { computed, watch } from 'vue';
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

const calcularHintUnidad = (index: number) => {
  let str = undefined;
  if (!!values.pivot[index].minimo && !!values.pivot[index].minimo) {
    str = `Min: ${values.pivot[index].minimo} - Max: ${values.pivot[index].maximo}`;
  }
  return str;
};
const calcularColorResultado = (index: number) => {
  let color = undefined;
  if (!!values.pivot[index].minimo && !!values.pivot[index].minimo) {
    if (
      values.pivot[index].resultado > values.pivot[index].minimo &&
      values.pivot[index].resultado < values.pivot[index].maximo
    ) {
      color = 'green-2';
    } else {
      color = 'red-2';
    }
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
          if (piv) {
            setFieldValue(minimo, piv.minimo);
            setFieldValue(maximo, piv.maximo);
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
      if (newValue) {
        setFieldValue(minimo, undefined);
        setFieldValue(maximo, undefined);
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
</script>
