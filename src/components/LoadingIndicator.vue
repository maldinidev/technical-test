<template>
  <div v-if="loading" role="status" aria-live="polite" class="text-center py-4 text-gray-500">
    Cargando imágenes...
  </div>
</template>

<script setup>
// Define the props for the component
defineProps({
  loading: {
    type: Boolean, // Indicates whether the loading state is active
    required: true, // This prop is mandatory for the component to render correctly
  },
});
</script>
