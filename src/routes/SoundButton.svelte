<script lang="ts">
  import { onMount } from 'svelte'
  import type { TransitionConfig } from 'svelte/transition'

  export let path: string
  export let title: string
  export let subtitle: string

  let disabled = true
  let audio: HTMLAudioElement
  let duration = 0

  onMount(() => {
    audio = new Audio(path)
    audio.addEventListener('loadeddata', () => {
      duration = audio.duration * 1000
      console.log(duration)
      disabled = false
    })
  })

  function playSound() {
    audio.play()
    disabled = true
    setTimeout(() => (disabled = false), duration + 250)
  }

  function animateProgress(node: HTMLElement, { duration }: TransitionConfig) {
    return {
      duration,
      css: (t: number) => `transform:scaleX(${t}); transform-origin: top left;`,
    }
  }
</script>

<button class="button" on:click={playSound} {disabled}>
  {#if disabled}
    <div class="progress-background" in:animateProgress={{ duration }} />
  {/if}
  <div class="title">{title}</div>
  <div class="subtitle">{subtitle}</div>
</button>

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
  }
  .button:disabled {
    color: black;
  }

  .title {
    font-size: 1.25rem;
    line-height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    position: relative;
  }

  .subtitle {
    font-size: 0.75rem;
    margin-top: 0.5rem;
    z-index: 2;
    position: relative;
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
    border-radius: 0.25rem;
  }
</style>
