<script lang="ts">
  import Counter from "./lib/Counter.svelte";
</script>

<main>
  <header></header>
  <section>
    <h1>Конвертер валют</h1>
    <Counter />
  </section>
</main>
<footer></footer>

<style>
  main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 150px;
  }
  section {
    height: 100%;
  }
  header {
    min-height: 40px;
    background-color: cadetblue;
  }
  footer {
    min-height: 80px;
    background-color: rgb(50, 77, 78);
  }
</style>
