<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import ImageCard from './ImageCard.vue';
import LoadingIndicator from './LoadingIndicator.vue';

// Reactive state
const images = ref([]); // Array of images
const loading = ref(false); // Loading indicator state
const currentPage = ref(1); // Current page for pagination
const limit = ref(20); // Number of images per fetch

/**
 * Fetch images from the API and add them to the `images` array.
 */
const fetchImages = async () => {
  try {
    loading.value = true; // Set loading to true while fetching
    const response = await fetch(
      `https://picsum.photos/v2/list?page=${currentPage.value}&limit=${limit.value}`
    );
    const data = await response.json();
    // Add new images to the array and set `loaded` to false for each
    images.value.push(...data.map((image) => ({ ...image, loaded: false })));
    currentPage.value++; // Increment the page counter
  } finally {
    loading.value = false; // Set loading to false after fetching
  }
};

/**
 * Handles infinite scrolling.
 * Fetches more images when the user scrolls near the bottom of the page.
 */
const handleScroll = () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && // Near the bottom
    !loading.value // Ensure no fetch is already in progress
  ) {
    fetchImages();
  }
};

// Lifecycle: Fetch initial images and set up scroll event listener
onMounted(() => {
  fetchImages(); // Initial fetch
  window.addEventListener('scroll', handleScroll); // Listen for scroll events
});

// Lifecycle: Clean up scroll event listener when the component is unmounted
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div>
    <!-- Image Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      <!-- Pass each image to the ImageCard component -->
      <ImageCard v-for="image in images" :key="image.id" :image="image" @load="(img) => (img.loaded = true)"
        @remove="(img) => images.splice(images.indexOf(img), 1)" />
    </div>

    <!-- Loading Indicator -->
    <LoadingIndicator :loading="loading" />
  </div>
</template>
