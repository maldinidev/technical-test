<template>
  <div v-if="loading" role="status" aria-live="polite" class="text-center py-4 text-gray-500">
    Cargando imágenes...
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
});
</script>
