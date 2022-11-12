<script setup lang="ts">
import MainLayout from "../layouts/MainLayout.vue";
import AddCryptoForm from "../components/AddCryptoForm.vue";
import StockList from "../components/StockList.vue";
</script>

<template>
  <MainLayout title="Stock list">
    <section class="section">
      <AddCryptoForm />
    </section>
    <section class="section">
      <StockList />
    </section>
    <div class="preview">
      Не работает на время поиска нужного API
    </div>
  </MainLayout>
</template>

<style scoped lang="scss">
.section {
  &:not(:last-child) {
    margin-bottom: 32px;
  }
}
.preview {
  text-align: center;
  font-size: 30px;
}
</style>
