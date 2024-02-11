<template>
  <div>{{ data }}</div>
</template>

<script setup lang="ts">
import { useRoleFetchPrivilegiosQuery } from '../composables/roleFetchPrivilegiosQuery';

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});
// const router = useRouter();
const { data, isSuccess, isFetching } = useRoleFetchPrivilegiosQuery(
  props.id,
  true
);
</script>

<style scoped></style>
