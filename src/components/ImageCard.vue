<template>
  <div class="relative group">
    <img :src="image.download_url" :alt="image.author" @load="handleImageLoad" loading="lazy"
      class="w-full h-48 object-cover shadow transition duration-700 ease-in-out transform"
      :class="image.loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'" />
    <div
      class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-85 duration-700 ease-in-out cursor-pointer"
      @click="removeImage">
      <span class="text-white font-bold">Eliminar</span>
    </div>
  </div>
</template>

<script setup>
// Define the props for the component
const props = defineProps({
  image: {
    type: Object, // Expecting an object with properties like `download_url`, `author`, and `loaded`
    required: true, // This prop is mandatory for the component to work
  },
});

// Define the events the component can emit
const emit = defineEmits(['remove']); // Declaring the 'remove' event that the parent component will listen to

// Function to mark the image as loaded
const handleImageLoad = () => {
  props.image.loaded = true; // Update the `loaded` property of the image prop when the image finishes loading
};

// Function to emit the 'remove' event to the parent
const removeImage = () => {
  emit('remove', props.image); // Emit the 'remove' event with the image object as the payload
};
</script>
