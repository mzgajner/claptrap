<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue'

const { path, title, subtitle } = defineProps<{
  path: string
  title: string
  subtitle: string
}>()

const disabled = ref(true)
const duration = ref(0)
let context: AudioContext
let buffer: AudioBuffer
let preloadedData: ArrayBuffer

onMounted(async () => {
  const response = await window.fetch(path)
  preloadedData = await response.arrayBuffer()
  disabled.value = false
})

async function playSound() {
  context = new AudioContext()
  buffer = buffer ?? (await context.decodeAudioData(preloadedData))
  duration.value = buffer.duration * 1000
  const source = context.createBufferSource()
  source.buffer = buffer
  source.connect(context.destination)
  source.start()
  disabled.value = true
  setTimeout(() => (disabled.value = false), duration.value)
}

const animationValue = computed(() => `fill-to-left ${duration.value}ms linear`)
</script>

<template>
  <button class="button" @click="playSound" :disabled="disabled">
    <div v-if="disabled" class="progress-background fill-to-left"></div>
    <div class="title">{{ title }}</div>
    <div class="subtitle">{{ subtitle }}</div>
  </button>
</template>

<style>
.button {
  background: #ffd200;
  border: none;
  padding: 1rem;
  user-select: none;
  cursor: pointer;
  appearance: none;
  position: relative;
  border-radius: 0.25rem;
  overflow: hidden;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.button:disabled {
  color: black;
  pointer-events: none;
  cursor: default;
}

.title {
  font-size: 1.25rem;
  line-height: 1.5rem;
  z-index: 2;
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
}

.subtitle {
  font-size: 0.888rem;
  margin-top: 0.5rem;
  z-index: 2;
  position: relative;
  opacity: 0.5;
}

.progress-background {
  background: #ffd200;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  filter: brightness(90%);
  transform-origin: top left;
  transform: scaleX(0);
  transition: transform 1s;
}

.fill-to-left {
  animation: v-bind(animationValue);
}

@keyframes fill-to-left {
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
}
</style>
