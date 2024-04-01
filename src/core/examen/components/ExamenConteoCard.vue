<template>
  <div
    v-for="categoria in categorias"
    :key="categoria.id"
    class="col-xs-12 col-sm-6"
  >
    <q-card>
      <q-card-section>
        <div class="q-mb-sm text-overline">
          {{ categoria.nombre }}
        </div>
        <q-list dense>
          <q-item
            v-for="examen in examensByCategoria(categoria.id)"
            :key="examen.id"
            dense
          >
            <q-item-section>{{ examen.nombre }}</q-item-section>
            <q-item-section side class="text-bold">
              {{ examen.ordens_count }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { Categoria, Examen } from 'core/examen';
import { computed } from 'vue';

const props = defineProps({
  examens: {
    type: Array<Examen>,
    required: true,
  },
});
const categorias = computed<Categoria[]>(() => {
  const categories = props.examens.map((ex) => ex.categoria.data);
  return categories
    .filter(
      (ex, index, self) => self.findIndex((t) => t.id === ex.id) === index
    )
    .map((ex) => ({ ...ex })); // Copia de los objetos originales para evitar mutaciones
});

const examensByCategoria = (id: number) => {
  return props.examens.filter((v) => v.categoria_id == id);
};
</script>
