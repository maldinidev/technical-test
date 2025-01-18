<script lang="ts">
import { defineComponent } from 'vue';
import ImageGrid from './components/ImageGrid.vue';

export default defineComponent({
  name: 'App',
  components: { ImageGrid },
});
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <ImageGrid />
  </div>
</template>

<style scoped></style>
