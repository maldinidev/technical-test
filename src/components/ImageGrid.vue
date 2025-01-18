<template>
  <div>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      <ImageCard v-for="image in images" :key="image.id" :image="image" @remove="removeImage" />
    </div>
    <LoadingIndicator :loading="loading" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import ImageCard from './ImageCard.vue';
import LoadingIndicator from './LoadingIndicator.vue';

// Reactive state variables
const images = ref([]); // Stores the list of images
const loading = ref(false); // Indicates whether data is being loaded
const currentPage = ref(1); // Tracks the current page for pagination
const limit = ref(20); // Number of images to fetch per page

// Fetch images from the API
const fetchImages = async () => {
  try {
    // Set loading state to true
    loading.value = true;
    const response = await fetch(
      `https://picsum.photos/v2/list?page=${currentPage.value}&limit=${limit.value}`
    );
    const data = await response.json();
    // Add new images to the existing list
    images.value.push(...data.map((image) => ({ ...image, loaded: false })));
    // Increment the page for the next fetch
    currentPage.value++;
  } finally {
    // Reset loading state
    loading.value = false;
  }
};

// Remove an image from the list
const removeImage = (image) => {
  const index = images.value.indexOf(image);
  if (index !== -1) {
    // Remove the image from the array
    images.value.splice(index, 1);
  }
};

// Handle infinite scroll
const handleScroll = () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
    !loading.value
  ) {
    fetchImages();
  }
};

// Lifecycle hooks
onMounted(() => {
  // Fetch initial images on component mount
  fetchImages();
  // Add scroll listener
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  // Remove scroll listener
  window.removeEventListener('scroll', handleScroll);
});
</script>
