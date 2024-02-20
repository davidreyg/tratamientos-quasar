<template>
  <div class="row">
    <q-card v-if="isFetching" class="col-sm-8 col-xs-12 col-md-6 q-pa-lg">
      <skeleton-form class="col-12" :inputs="2" />
    </q-card>

    <user-edit-form
      v-if="isSuccess && !isFetching && data"
      class="col-sm-8 col-xs-12 col-md-6 q-pa-lg"
      :user="data"
      @submit="onSubmit"
      @cancel="$router.back()"
    />
  </div>
</template>

<script setup lang="ts">
import SkeletonForm from 'shared/components/skeletons/SkeletonForm.vue';
import { NotifyUtils } from 'shared/utils';
import { useRouter } from 'vue-router';
import UserEditForm from '../components/forms/UserEditForm.vue';
import { useUserFetchByIdQuery } from '../composables';

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});
const router = useRouter();
const { data, isSuccess, isFetching } = useUserFetchByIdQuery(props.id, true);
const onSubmit = () => {
  NotifyUtils.success('Registro actualizado correctamente');
  router.back();
};
</script>

<style scoped></style>
