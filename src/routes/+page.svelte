<script>
  import SoundButton from './SoundButton.svelte'
  import sounds from '../sounds'
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
  {#each sounds as sound}
    <SoundButton {...sound} />
  {/each}
</section>

<style>
  section {
    display: grid;
    grid-template-columns: repeat(auto-fill, calc(20% - 0.8rem));
    grid-gap: 1rem;
    justify-content: space-between;
    padding: 2rem;
  }
</style>
