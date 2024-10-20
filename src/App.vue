<script setup lang="ts">
import SoundButton from './components/SoundButton.vue'
import sounds from '../sounds.json'
</script>

<template>
  <main>
    <SoundButton v-for="sound in sounds" v-bind="sound" :key="sound.path" />
  </main>
</template>

<style scoped>
main {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: 1fr;
  grid-gap: 1rem;
  justify-content: space-between;
  padding: 1rem 1rem;
  box-sizing: border-box;
}
</style>
