<script>
  import { onMount, beforeUpdate } from "svelte";
  import { fade, fly } from "svelte/transition";
  let items;

  let randomNo = 0;
  onMount(async () => {
    let res = await fetch(
      "https://staging.followmedia.tk/client/app/get-data/?appdata_id=ed13350c-f9bf-473c-afb7-ac060f7da16c"
    );
    let data = await res.json();
    items = data;
    getRandomNo();
  });
  function getRandomNo(params) {
    randomNo = Math.floor(
      Math.random() *
        Math.floor(
          items
            ? parseInt(items.appData.categories.map(val => val.items.length))
            : 3
        )
    );
  }
  setInterval(getRandomNo, 8000);
</script>

<style lang="scss">
  @import "./styles.scss";
  .currenItem {
    background: var(--bnt-bg) !important;
  }
</style>

<main class="menu-board">
  {#if items}
    <header class="header">{items.appData.restaurant.name}</header>
    <section class="card-wrapper">
      {#each items.appData.categories as category}
        <section class="card">
          <div class="card__content">
            <div class="card__content--body">
              <div class="items-title">{category.category}</div>
              <ul class="items">
                {#each category.items as item, i}
                  <li class="item" transition:fade={{ duration: 300 * i + 1 }}>
                    <span class="item-name">{item.item}</span>
                    <span class="item-price">{item.price}$</span>
                  </li>
                {/each}
              </ul>
            </div>
            <div
              in:fade={{ opacity: 1, duration: 1000 }}
              out:fly={{ opacity: 0, duration: 1000 }}
              class="card__content--img"
              style="background-image:url('{category.items[randomNo] && category.items[randomNo].img}');" />
          </div>
        </section>
      {/each}
    </section>
  {/if}
</main>
