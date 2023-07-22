<script>
  import SoundButton from './SoundButton.svelte'
  import sounds from '../sounds'
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="wrapper">
  <section>
    {#each sounds as sound}
      <SoundButton {...sound} />
    {/each}
  </section>
</div>

<style>
  .wrapper {
    display: flex;
    justify-content: center;
    min-height: 100vh;
  }

  section {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-auto-rows: 1fr;
    grid-gap: 1rem;
    justify-content: space-between;
    padding: 1rem 1rem;
    box-sizing: border-box;
    max-width: 1140px;
    width: 100%
  }

  @media (min-width: 1140px) {
    .wrapper {
      align-items: center;
    }
  }
  @media (max-width: 1139px) {
    section {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
  @media (max-width: 906px) {
    section {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  @media (max-width: 690px) {
    section {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 480px) {
    section {
      grid-template-columns: 1fr;
    }
  }
</style>
