<template>
  <div>
    <div class="col-12 row q-col-gutter-lg">
      <div v-for="x in 5" :key="x" class="col-12">
        <q-skeleton type="QInput" />
      </div>
    </div>

    <q-card-actions align="right" class="col-12 justify-end q-pa-none q-pt-md">
      <q-skeleton type="QBtn" class="q-mr-md" />
      <q-skeleton type="QBtn" />
    </q-card-actions>
  </div>
</template>
