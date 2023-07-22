<script lang="ts">
  import { onMount } from 'svelte'
  import type { TransitionConfig } from 'svelte/transition'

  export let path: string
  export let title: string
  export let subtitle: string

  let disabled = true
  let duration = 0
  let context: AudioContext
  let buffer: AudioBuffer
  let preloadedData: ArrayBuffer

  onMount(async () => {
    const response = await window.fetch(path)
    preloadedData = await response.arrayBuffer()
    disabled = false
  })

  async function playSound() {
    context = new AudioContext()
    buffer = buffer ?? await context.decodeAudioData(preloadedData)
    duration = buffer.duration * 1000
    const source = context.createBufferSource()
    source.buffer = buffer
    source.connect(context.destination)
    source.start()
    disabled = true
    setTimeout(() => (disabled = false), duration)
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
    overflow: hidden;
    color: black;
  }
  .button:disabled {
    color: black;
    pointer-events: none;
    cursor: default;
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
  }
</style>
