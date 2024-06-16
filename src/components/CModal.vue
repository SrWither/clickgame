<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { getLeaders, type Leader } from '@/api/leaderboard'
import { defineEmits } from 'vue'

const emit = defineEmits(['close'])

const leaders = ref<Leader[]>([])

const fetchLeaders = async () => {
  try {
    const response = await getLeaders()
    leaders.value = response
  } catch (error) {
    console.error('Error al obtener los líderes:', error)
  }
}

onBeforeMount(async () => {
  await fetchLeaders()
})

const closeModal = () => {
  emit('close')
}

const formatTime = (millis: number): string => {
  let minutes = Math.floor(millis / 60000)
  let seconds = Math.floor((millis % 60000) / 1000)
  let formattedSeconds = seconds < 10 ? '0' + seconds : String(seconds)
  return `${minutes}:${formattedSeconds}`
}
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <p class="text-lg font-semibold mb-4">Ganadores:</p>
      <ul>
        <li v-for="leader in leaders" :key="leader.id" class="mb-2">
          <span class="font-semibold">{{ leader.name }}</span> - {{ formatTime(leader.time) }}
        </li>
      </ul>
      <button
        @click="closeModal"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Comenzar
      </button>
    </div>
  </div>
</template>
