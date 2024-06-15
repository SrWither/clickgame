<script setup lang="ts">
const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <p>el juego tiene sonido</p>
      <button @click="closeModal">Comenzar</button>
    </div>
  </div>
</template>
