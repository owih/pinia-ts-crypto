<script setup lang="ts">
import CardInfo from "./CardInfo.vue";
import { useCryptoStore } from "../stores/CryptoStore";
import { onUnmounted } from "vue";

const cryptosStore = useCryptoStore();
cryptosStore.setStateFromLocalStorage();
cryptosStore.fetchCryptos();

const updateCryptos = setInterval(cryptosStore.fetchCryptos, 5000);
onUnmounted((): void => {
  clearInterval(updateCryptos);
  cryptosStore.saveStateToLocalStorage();
});

const saveToStorage = (): void => { cryptosStore.saveStateToLocalStorage() }

const removeItem = (event: string): void => { cryptosStore.removeCrypto(event) };
</script>

<template>
  <h2 class="title">List</h2><button class="button" @click="saveToStorage">Save to storage</button>
  <div class="list" v-if="cryptosStore.getCryptos.length">
    <div class="list__item" v-for="crypto in cryptosStore.getCryptos" :key="crypto.name">
      <CardInfo
          :name="crypto.name"
          :price="crypto.price"
          :img="crypto.img"
          :changes="crypto.changes"
          @removeItem="removeItem"
      />
    </div>
  </div>
  <div v-else>List is empty...</div>
</template>

<style scoped lang="scss">
.title {
  display: inline-block;
  margin-right: 12px;
}
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
