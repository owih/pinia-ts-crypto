<script setup lang="ts">
import MainLayout from "../layouts/MainLayout.vue";
import CryptoList from "../components/CryptoList.vue";
import AddCryptoForm from "../components/AddCryptoForm.vue";
</script>

<template>
  <MainLayout title="Crypto list">
    <section class="section">
      <AddCryptoForm />
    </section>
    <section class="section">
      <CryptoList />
    </section>
  </MainLayout>
</template>

<style scoped lang="scss">
.section {
  &:not(:last-child) {
    margin-bottom: 32px;
  }
}
</style>
