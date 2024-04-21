<template>
  <base-form :loading="isLoading" @submit="onSubmit" @cancel="$emit('cancel')">
    <base-input name="nombre_completo" label="Nombre Completo" class="col-12" />

    <base-input name="name" label="Usuario" class="col-xs-12 col-sm-6" />
    <!-- <base-input
      name="password"
      label="Contraseña"
      class="col-xs-12 col-sm-6"
      type="password"
    /> -->
    <base-select
      :options="arr_establecimientos"
      name="establecimiento_id"
      class="col-xs-12 col-sm-6"
      label="Establecimiento"
      :loading="false"
      required
    />
    <base-input name="cargo" label="Cargo" class="col-xs-12 col-sm-6" />
    <div class="col-12">
      <q-separator spaced />
      Roles:
    </div>
    <base-check-box-group name="role_ids" label="Roles" :options="arr_roles" />
  </base-form>
</template>

<script setup lang="ts">
import { useEstablecimientoFetchAllQuery } from 'core/establecimiento';
import { useRoleListQuery } from 'core/role';
import { User, UserUpdateRequest, useUserUpdateMutation } from 'core/user';
import BaseCheckBoxGroup from 'shared/components/base/BaseCheckBoxGroup.vue';
import BaseForm from 'shared/components/base/BaseForm.vue';
import BaseInput from 'shared/components/base/BaseInput.vue';
import BaseSelect from 'shared/components/base/BaseSelect.vue';
import { Query } from 'shared/utils';
import { useForm } from 'vee-validate';
import { PropType, computed, ref } from 'vue';
import { array, object, string } from 'yup';

const props = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
});
const emit = defineEmits<{
  submit: [];
  cancel: [];
}>();
const validationSchema = object().shape({
  name: string().trim().min(2).required().label('Usuario'),
  nombre_completo: string().trim().min(2).required().label('Nombre Completo'),
  cargo: string().trim().min(2).required().label('Cargo'),
  // password: string().trim().min(2).required().label('Contraseña'),
  establecimiento_id: string().required().label('Establecimiento'),
  role_ids: array().of(string().required()).required().label('Roles'),
});

const { handleSubmit, setErrors, resetForm } = useForm<UserUpdateRequest>({
  validationSchema,
  initialValues: props.user,
});

const query = ref<Query>({ limit: 0 });
const { data: establecimientos } = useEstablecimientoFetchAllQuery(query);
// const { replace } = useFieldArray('role_ids');
// replace(props.user.role_ids);
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
const { roles } = useRoleListQuery();

const arr_roles = computed(() => {
  if (roles.value) {
    return roles.value.map((val) => {
      return {
        label: val.display_name,
        value: Number(val.id),
      };
    });
  }
  return [];
});

const { isLoading, mutate, reset } = useUserUpdateMutation();

const onSubmit = handleSubmit(
  async (values) => {
    mutate(
      { data: values, id: Number(props.user.id) },
      {
        onSuccess: () => {
          emit('submit');
        },
        onError: (err) => {
          resetForm();
          reset.value();
          setErrors(err.data.errors);
        },
      }
    );
  },
  (error) => {
    console.log(error);
  }
);
</script>
