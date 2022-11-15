<script setup lang="ts">
import CardInfo from "./CardInfo.vue";
import { useCryptoStore } from "../stores/CryptoStore";
import { onUnmounted, watch } from "vue";
import { storeToRefs } from "pinia";

const cryptosStore = useCryptoStore();
cryptosStore.setStateFromLocalStorage();
if (cryptosStore.getChosenList.length) cryptosStore.fetchCryptos().finally(() => cryptosStore.updateFirstLoad(false));
else cryptosStore.updateFirstLoad(false);

const clearCryptos = () => cryptosStore.clearCryptoStore();
const { getCryptos } = storeToRefs(cryptosStore);

let updateCryptos: any = null;
const startInterval = () => updateCryptos = setInterval(cryptosStore.fetchCryptos, 5000);

// Прерываем получение данных если массив пуст и наоборот
watch(getCryptos, (next, prev) => {
  if (!prev.length && next.length) startInterval();
  else if (!next.length) clearInterval(updateCryptos);
})

onUnmounted((): void => {
  clearInterval(updateCryptos);
  cryptosStore.saveStateToLocalStorage();
  cryptosStore.updateFirstLoad(true);
});

const saveToStorage = (): void => { cryptosStore.saveStateToLocalStorage() }
const removeItem = (event: string): void => { cryptosStore.removeCrypto(event) };
</script>

<template>
  <h2 class="title">List</h2><button class="button" @click="saveToStorage">Save to storage</button>
  <div class="list" v-if="getCryptos.length">
    <div v-if="getCryptos.length" class="list__added">Crypto cards added: {{ getCryptos.length }}</div>
    <div class="list__row">
      <div class="list__item" v-for="crypto in getCryptos" :key="crypto.name">
        <CardInfo
            :name="crypto.name"
            :price="crypto.price"
            :img="crypto.img"
            :changes="crypto.changes"
            @removeItem="removeItem"
        />
      </div>
    </div>
    <div class="list__clear-control">
      <button @click="clearCryptos" class="button">Clear list</button>
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
  &__row {
    display: flex;
    flex-wrap: wrap;
    margin: -12px;
  }
  &__added {
    margin-bottom: 16px;
  }
  &__clear-control {
    margin-top: 24px;
  }
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
