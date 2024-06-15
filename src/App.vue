<script setup lang="ts">
import { ref } from 'vue'
import Modal from '@/components/CModal.vue'
import Button from '@/components/CButton.vue'
import { onMounted, computed } from 'vue'

const showModal = ref(true)
const btn = ref<HTMLButtonElement | null>(null)
const isMobile = ref<boolean>(window.matchMedia('(pointer: coarse)').matches)
const container = ref<HTMLButtonElement | null>(null)

const isNight = ref(false)
const isRain = ref(false)
const isParty = ref(false)

const partyClass = computed(() => {
  return isParty.value ? 'dance' : ''
})

// Sounds
const music = [
  'music/ultra.mp3',
  'music/papamericano.mp3',
  'music/wrn1.mp3',
  'music/nnmcmtd.mp3',
  'music/albatraoz.mp3'
]

const thunders = ['effects/thunder1.mp3', 'effects/thunder2.mp3', 'effects/thunder3.mp3']

let partyAudio = new Audio('music/ultra.mp3')
let thunderAudio = new Audio('effects/thunder1.mp3')

const selectMusic = () => {
  if (!partyAudio.paused) {
    partyAudio.pause()
    partyAudio.currentTime = 0
  }
  const song = music[Math.floor(Math.random() * music.length)]
  partyAudio = new Audio(song)
}

const selectThunder = () => {
  if (!thunderAudio.paused) {
    thunderAudio.pause()
    thunderAudio.currentTime = 0
  }
  const thunder = thunders[Math.floor(Math.random() * thunders.length)]
  thunderAudio = new Audio(thunder)
}

const closeModal = () => {
  showModal.value = false
}

const handleButtonClick = () => {
  if (!isMobile.value) {
    const randomPhrase = getRandomPhrase()
    alert(randomPhrase)
  }
}

// Rain
const createRain = () => {
  if (container.value) {
    for (let i = 0; i < 80; i++) {
      let gout = document.createElement('i')
      gout.classList.add('gout', 'lightgout')
      gout.style.left = `${Math.random() * innerWidth}px`
      gout.style.animationDuration = `${Math.random() * 0.6 + 0.4}s`
      gout.style.animationDelay = `${Math.random()}s`
      container.value.appendChild(gout)
    }
    container.value.style.display = 'none'
  }
}

const toggleRain = () => {
  if (container.value && btn.value) {
    container.value.style.display = isRain.value ? 'none' : 'block'
    btn.value.textContent = isRain.value ? 'Uy dejó de llover' : 'Uy se largó la lluvia'
    isRain.value = !isRain.value
    if (isRain.value && isNight) startLightning()
  }
}

const startLightning = () => {
  if (isRain.value && isNight.value) {
    setTimeout(
      () => {
        if (isRain.value && isNight.value) {
          flashLightning()
          startLightning()
        }
      },
      Math.random() * 10000 + 5000
    )
  }
}

const flashLightning = () => {
  const flash = document.createElement('div')
  flash.className = 'flash'
  document.body.appendChild(flash)
  selectThunder()
  thunderAudio.play()
  setTimeout(() => {
    flash.style.opacity = '1'
    setTimeout(() => {
      flash.style.opacity = '0'
      setTimeout(() => {
        document.body.removeChild(flash)
      }, 100)
    }, 100)
  }, 100)
}

const rainColor = () => {
  document.querySelectorAll('.gout').forEach((gout) => {
    gout.classList.toggle('lightgout', document.body.style.backgroundColor !== 'black')
  })
}

onMounted(() => {
  createRain()
})

// Freeze
const freezeCursor = () => {
  const freezeOverlay = document.createElement('div')
  freezeOverlay.style.position = 'fixed'
  freezeOverlay.style.top = '0'
  freezeOverlay.style.left = '0'
  freezeOverlay.style.width = '100vw'
  freezeOverlay.style.height = '100vh'
  freezeOverlay.style.cursor = 'none'
  freezeOverlay.style.zIndex = '9999'
  document.body.appendChild(freezeOverlay)

  setTimeout(() => {
    document.body.removeChild(freezeOverlay)
  }, 5000)
}

// day and night
const changeColor = (color: string) => {
  document.body.style.backgroundColor = color
  rainColor()
}

const handleDay = () => {
  changeColor('white')
  isNight.value = false
  if (btn.value)
    btn.value.textContent =
      document.body.style.backgroundColor === 'white' ? 'Uy aún es de día' : 'Uy se hizo de dia'
}

const handleNight = () => {
  changeColor('black')
  isNight.value = true
  if (btn.value)
    btn.value.textContent =
      document.body.style.backgroundColor === 'black' ? 'Uy aún es de noche' : 'Uy se hizo de noche'
  if (isRain.value && isNight.value) startLightning()
}

// Party
const handleParty = () => {
  if (btn.value) {
    btn.value.textContent = isParty.value ? 'Uy la fiesta aun sigue' : 'Uy fiesta'
    document.body.classList.add('party')
    if (!isParty.value) {
      selectMusic()
      partyAudio.loop = true
      console.log(partyAudio.src)
      partyAudio.play()
    }
    isParty.value = true
  }
}

const handleEndParty = () => {
  if (btn.value) {
    btn.value.textContent = isParty.value ? 'Se acabó la fiesta' : 'Que silencio'
    document.body.classList.remove('party')
    isParty.value = false
    if (!isParty.value) {
      partyAudio.loop = false
      partyAudio.pause()
      partyAudio.currentTime = 0
    }
  }
}

const phrases: string[] = [
  'Lo siento pero no ganaste',
  'Casi pero no',
  'Estuviste cerca',
  'Ponle mas ganas',
  'Felicidades ganaste, envíame una foto de esto',
  'na, perdiste',
  'Si la vida te da limones, ganas, pero como esto no te dio nada, perdiste',
  'Perdiste :p'
]

const getRandomPhrase = () => {
  return phrases[Math.floor(Math.random() * phrases.length)]
}
</script>

<template>
  <div id="app">
    <Modal v-if="showModal" @close="closeModal" />
    <Button
      @click="handleButtonClick"
      @freeze="freezeCursor"
      @rain="toggleRain"
      @day="handleDay"
      @night="handleNight"
      @party="handleParty"
      @endparty="handleEndParty"
      ref="btn"
      :class="partyClass"
    />
    <div id="container" ref="container">
      <div id="vapour"></div>
    </div>
  </div>
</template>
