<script lang="ts">
  import { onMount } from "svelte";

  interface ApiResponse {
    conversion_rates: Record<string, number>;
    conversion_rate: number;
  }

  const apiKey = "4d970f1b5b749642ee39909c";
  const allCurrencies: string[] = [];
  let currencyFrom = "";
  let currencyTo = "";
  let summ: number = 0;
  let rate: number;
  let isLoading = true;
  let result: number = 0;

  $: if (rate && summ) {
    result = rate * summ;
  }
  $: if (currencyFrom && currencyTo) {
    isLoading = true;
    getData(currencyFrom, currencyTo, "pair");
  }

  async function getData(
    first: string = "USD",
    second: string = "",
    method: string = "latest",
  ) {
    let adress = `https://v6.exchangerate-api.com/v6/${apiKey}/${method}/${first}`;
    if (second) adress += `/${second}`;
    try {
      const response = await fetch(adress);
      const data = (await response.json()) as ApiResponse;
      if (method === "latest") {
        for (let curency in data.conversion_rates) {
          allCurrencies.push(curency);
        }
        return allCurrencies;
      } else if (method === "pair") {
        rate = data.conversion_rate;
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    getData();
  });
</script>

<form on:submit|preventDefault>
  {#if !isLoading}
    <div class="wrapper">
      <div class="wrapper_item">
        <select class="inputs" bind:value={currencyFrom}>
          <option value="" disabled selected hidden>Выбери валюту</option>
          {#each allCurrencies as currency}
            <option value={currency}>
              {currency}
            </option>
          {/each}
        </select>
        <select class="inputs" bind:value={currencyTo}>
          <option value="" disabled selected hidden>Выбери валюту</option>
          {#each allCurrencies as currency}
            <option value={currency}>
              {currency}
            </option>
          {/each}
        </select>
      </div>
      <div>
        <input type="number" min="0" bind:value={summ} />
        {#if currencyTo}
          <p>{currencyFrom} = {result} {currencyTo}</p>
        {:else}
          <p>Не все данные ввели</p>
        {/if}
      </div>
    </div>
  {:else}
    <p>Loading... please wait.</p>
  {/if}
</form>

<style>
  .inputs {
    min-width: 70px;
    font-size: medium;
    padding: 2px;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
  .wrapper_item {
    display: flex;
    gap: 20px;
    align-items: center;
  }
  @media (max-width: 380px) {
    .wrapper_item {
      flex-direction: column;
    }
  }
</style>
