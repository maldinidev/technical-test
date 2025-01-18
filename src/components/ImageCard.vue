<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Props definition
const props = defineProps({
  image: {
    type: Object,
    required: true,
  },
});

// Emit events for parent communication
defineEmits(['remove', 'load']);

const imgRef = ref(null); // Reference to the image element
let observer = null; // IntersectionObserver instance

/**
 * Sets up an IntersectionObserver to observe the image
 * and loads its `src` when it becomes visible.
 */
const observeImage = () => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.src = props.image.download_url; // Assign the actual src value
          observer.unobserve(entry.target); // Stop observing the image
        }
      });
    },
    { threshold: 0.1 } // Detect when 10% of the image is visible
  );

  if (imgRef.value) {
    imgRef.value.src = ''; // Prevent immediate loading of the image
    observer.observe(imgRef.value); // Start observing the image
  }
};

// Setup observer when the component is mounted
onMounted(observeImage);

// Clean up the observer when the component is unmounted
onUnmounted(() => {
  if (observer) observer.disconnect(); // Disconnect the observer
});
</script>

<template>
  <div class="relative group">
    <!-- Placeholder for the loading state -->
    <div v-if="!image.loaded" class="absolute inset-0 bg-gray-200 animate-pulse"></div>

    <!-- Lazy-loaded image -->
    <img ref="imgRef" :alt="image.author" @load="$emit('load', image)"
      class="w-full h-48 object-cover shadow transition duration-700 ease-in-out transform"
      :class="image.loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'" />

    <!-- Remove button -->
    <div
      class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-85 duration-700 ease-in-out cursor-pointer"
      @click="$emit('remove', image)">
      <span class="text-white font-bold">Eliminar</span>
    </div>
  </div>
</template>
