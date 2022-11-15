<script setup lang="ts">
import { ref } from "vue";
import { useCryptoStore } from "../stores/CryptoStore";
import { notify } from "@kyvg/vue3-notification";

const cryptoStore = useCryptoStore();
const cryptoName = ref('');

function addCryptoProcess(): void {
  const isExists = cryptoStore.getIsCryptoWasChosen(cryptoName.value);
  if (cryptoName.value.trim() === '' || isExists) {
    notify({
      title: 'Incorrect crypto or this one was already added',
      type: 'error'
    })
    cryptoName.value = '';
    return;
  }
  cryptoStore.addChosenCrypto(cryptoName.value.trim().toLowerCase());
  cryptoStore.fetchCryptos();
  cryptoName.value = '';
}
</script>

<template>
  <h2 class="title">Add crypto card</h2>
  <form @submit.prevent="addCryptoProcess" class="add-crypto-form">
    <div class="add-crypto-form__item">
      <label class="label" for="name">Enter the Crypto name</label>
    </div>
    <div class="add-crypto-form__item">
      <input v-model="cryptoName" id="name" type="text" class="input" placeholder="BTC or DOGE">
    </div>
    <div class="add-crypto-form__item">
      <button class="button" type="submit">Add</button>
    </div>
  </form>
</template>

<style scoped lang="scss">
@import "../assets/variables";
.add-crypto-form {
  .label {
    display: block;
    margin-bottom: 8px;
    font-size: 16px;
  }
  .input {
    padding: 8px 8px 6px;
    border: 1px solid $light;
    outline: none;
    border-radius: 4px;
    font-size: 16px;
  }
  &__item {
    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }
}
</style>
