<script setup lang="ts">
import CardInfo from "./CardInfo.vue";
// import { onUnmounted } from "vue";
import { useStockStore } from "../stores/StockStore";

const stockStore = useStockStore();
stockStore.setStateFromLocalStorage();

// TODO: Найти API для корректного получения информации об акциях
// stockStore.fetchStocks();

// const updateCryptos = setInterval(stockStore.fetchStocks, 5000);
// onUnmounted((): void => {
//   clearInterval(updateCryptos);
//   stockStore.saveStateToLocalStorage();
// });

const removeItem = (event: string): void => { stockStore.removeStock(event) };
</script>

<template>
  <h2 class="title">List</h2>
  <div class="list" v-if="stockStore.getStocks.length">
    <div class="list__item" v-for="stock in stockStore.getStocks" :key="stock.name">
      <CardInfo
          :name="stock.name"
          :price="stock.price"
          :img="stock.img"
          :changes="stock.changes"
          :symbol="stock.symbol"
          @removeItem="removeItem"
      />
    </div>
  </div>
  <div v-else>List is empty...</div>
</template>

<style scoped lang="scss">
.list {
  display: flex;
  flex-wrap: wrap;
  margin: -12px;
  &__item {
    padding: 12px;
    flex: 1 0 100%;
    @media (min-width: 576px) {
      flex: 0 0 50%;
    }
    @media (min-width: 768px) {
      flex: 0 0 33.333333%;
    }
    @media (min-width: 992px) {
      flex: 0 0 25%;
    }
  }
}
</style>
