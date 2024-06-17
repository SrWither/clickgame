<template>
  <button id="btn" ref="btn" @mouseover="handleMouseOver" @touchstart="handleMouseOver">
    {{ buttonText }}
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const buttonText = ref('Intenta clickearme')
const btn = ref<HTMLButtonElement | null>(null)

const emits = defineEmits(['night', 'rain', 'party', 'day', 'freeze', 'endparty'])

const handleMouseOver = () => {
  if (btn.value) {
    const windowWidth = window.innerWidth - btn.value.offsetWidth
    const windowHeight = window.innerHeight - btn.value.offsetHeight
    btn.value.style.left = `${Math.floor(Math.random() * windowWidth)}px`
    btn.value.style.top = `${Math.floor(Math.random() * windowHeight)}px`
    updateButton()
  }
}

const buttonTexts: string[] = [
  'Ueesa',
  'Oleee',
  'Casiii',
  'Por poco',
  'Inténtalo de nuevo',
  '¡Casi lo logras!',
  'No te rindas',
  'Otra vez',
  'Sigue intentando',
  '¡Uy!',
  '¡Vamos!',
  '¡Casi!',
  'Lo tienes',
  'No muy lejos',
  'Casi llegas',
  'A poco',
  'Inténtalo otra vez',
  'Sigue así',
  'Lo estás logrando',
  'Un poco más',
  '¡Ánimo!',
  'Casi, casi',
  'Uy me puse rojo',
  'Uy me puse verde',
  'Uy me puse azul',
  'Uy me hago grande',
  'Uy se hizo de dia',
  'A donde ibas?',
  'Uy se hizo de noche',
  'Uy me hago chico',
  'Uy se largó la lluvia',
  'Uy fiesta',
  'Se acabó la fiesta',
  'Congelado'
]

const updateButton = () => {
  buttonText.value = buttonTexts[Math.floor(Math.random() * buttonTexts.length)]
  handleSpecialActions(buttonText.value)
}

const handleSpecialActions = (text: string) => {
  if (btn.value) {
    switch (text) {
      case 'Uy me puse rojo':
        btn.value.style.background =
          btn.value.style.background === '#ff0000' ? btn.value.style.background : '#ff0000'
        break
      case 'Uy me puse azul':
        btn.value.style.background =
          btn.value.style.background === '#0000ff' ? btn.value.style.background : '#0000ff'
        break
      case 'Uy me puse verde':
        btn.value.style.background =
          btn.value.style.background === '#00ff00' ? btn.value.style.background : '#00ff00'
        break
      case 'A donde ibas?':
        btn.value.style.transform = 'rotate(360deg)'
        break
      case 'Uy me hago grande':
        btn.value.style.fontSize =
          btn.value.style.fontSize === '24px' ? btn.value.style.fontSize : '24px'
        break
      case 'Uy me hago chico':
        btn.value.style.fontSize = btn.value.style.fontSize === '' ? btn.value.style.fontSize : ''
        break
      case 'Uy se largó la lluvia':
        emits('rain')
        break
      case 'Uy se hizo de noche':
        emits('night')
        break
      case 'Uy se hizo de dia':
        emits('day')
        break
      case 'Uy fiesta':
        emits('party')
        break
      case 'Se acabó la fiesta':
        emits('endparty')
        break
      case 'Congelado':
        emits('freeze')
        break
      default:
        break
    }
  }
}
</script>
