<template>
  <div
    v-for="categoria in categorias"
    :key="categoria.id"
    class="col-xs-12 col-sm-6"
  >
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ categoria.nombre }}</div>
        <!-- <div class="text-subtitle2">by John Doe</div> -->
      </q-card-section>
      <q-card-section>
        <base-check-box-group
          name="examen_ids"
          label="Examen"
          :options="examensByCategoria(categoria.id)"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { Categoria, useExamenFetchAllQuery } from 'core/examen';
import BaseCheckBoxGroup from 'shared/components/base/BaseCheckBoxGroup.vue';
import { Query } from 'shared/utils';
import { computed, ref } from 'vue';
const query = ref<Query>({ limit: 0 });
const { data } = useExamenFetchAllQuery(query);
const categorias = computed<Categoria[]>(() => {
  if (data.value) {
    const categories = data.value.map((ex) => ex.categoria.data);
    return categories
      .filter(
        (ex, index, self) => self.findIndex((t) => t.id === ex.id) === index
      )
      .map((ex) => ({ ...ex })); // Copia de los objetos originales para evitar mutaciones
  } else {
    return [];
  }
});

const examensByCategoria = (id: number) => {
  return data.value
    ? data.value
        .filter((v) => v.categoria_id == id)
        .map((v) => ({ label: v.nombre, value: Number(v.id) }))
    : [];
};
</script>
