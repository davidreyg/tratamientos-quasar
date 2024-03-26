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
        <base-check-box-group
          size="xs"
          style="font-size: small"
          dense
          name="examen_ids"
          label="Examen"
          :options="examensByCategoria(categoria.id)"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { Categoria, Examen } from 'core/examen';
import BaseCheckBoxGroup from 'shared/components/base/BaseCheckBoxGroup.vue';
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
  return props.examens
    ? props.examens
        .filter((v) => v.categoria_id == id)
        .map((v) => ({ label: v.nombre, value: Number(v.id) }))
    : [];
};
</script>
