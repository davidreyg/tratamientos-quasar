<template>
  <base-form :loading="isLoading" @submit="onSubmit" @cancel="$emit('cancel')">
    <base-input name="nombre" label="Nombre" class="col-12" />
    <div class="col-12"><q-separator spaced /> Examenes</div>
    <div class="col-12 row q-col-gutter-sm">
      <examen-card-list v-if="examens" :examens="examens" />
    </div>
  </base-form>
</template>

<script setup lang="ts">
import { useExamenFetchAllQuery } from 'core/examen';
import { Paquete, PaqueteRequest } from 'core/paquete';
import { usePaqueteUpdateMutation } from 'core/paquete/composables';
import BaseForm from 'shared/components/base/BaseForm.vue';
import BaseInput from 'shared/components/base/BaseInput.vue';
import { Query } from 'shared/utils';
import { useForm } from 'vee-validate';
import { PropType, ref } from 'vue';
import { object, string } from 'yup';
import ExamenCardList from '../cards/ExamenCardList.vue';
const props = defineProps({
  paquete: {
    type: Object as PropType<Paquete>,
    required: true,
  },
});
const emit = defineEmits<{
  submit: [];
  cancel: [];
}>();
const validationSchema = object().shape({
  nombre: string().trim().min(2).required().label('Nombre'),
});

const { handleSubmit, setErrors } = useForm<PaqueteRequest>({
  validationSchema,
  initialValues: props.paquete,
});

const query = ref<Query>({
  limit: 0,
  search: 'is_active:1',
  searchJoin: 'and',
});
const { data: examens } = useExamenFetchAllQuery(query);

const { isLoading, mutate } = usePaqueteUpdateMutation();

const onSubmit = handleSubmit(async (values) => {
  mutate(
    { data: values, id: props.paquete.id },
    {
      onSuccess: () => {
        emit('submit');
      },
      onError: (err) => {
        setErrors(err.data.errors);
      },
    }
  );
});
</script>
