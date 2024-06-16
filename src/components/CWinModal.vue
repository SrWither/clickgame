<script setup lang="ts">
import { ref } from 'vue'
import { createLeader, getUUID } from '@/api/leaderboard'

const emit = defineEmits(['close'])
const props = defineProps<{ time: number }>()

const name = ref('')

const closeModal = () => {
  emit('close')
}

const formatTime = (millis: number): string => {
  let minutes = Math.floor(millis / 60000)
  let seconds = Math.floor((millis % 60000) / 1000)
  let formattedSeconds = seconds < 10 ? '0' + seconds : String(seconds)
  return `${minutes}:${formattedSeconds}`
}

const submitForm = async () => {
  try {
    const uuid = await getUUID()
    const newLeader = {
      id: uuid[0],
      name: name.value,
      time: props.time
    }
    await createLeader(newLeader)
    closeModal()
  } catch (error) {
    console.error('Error al crear el líder:', error)
  }
}
</script>

<template>
  <div class="modal">
    <div class="modal-content p-6 bg-white rounded-lg shadow-md">
      <p class="text-lg font-semibold mb-4">Felicidades, eres un ganador</p>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Nombre:</label>
          <input
            id="name"
            v-model="name"
            type="text"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
        </div>
        <p>Tiempo: {{ formatTime(props.time) }}</p>
        <button
          type="submit"
          class="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Guardar
        </button>
      </form>
      <button
        @click="closeModal"
        class="inline-block mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
      >
        Cerrar
      </button>
    </div>
  </div>
</template>
