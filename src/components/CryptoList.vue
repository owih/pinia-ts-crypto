<script setup lang="ts">
import { useCryptoStore } from "../stores/CryptoStore";
import CryptoCard from "./CryptoCard.vue";

const cryptos = useCryptoStore();
cryptos.fetchCryptos();
</script>

<template>
  <div class="list">
    <div class="item">
      <CryptoCard />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
