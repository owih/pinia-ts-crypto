<script setup lang="ts">
import HeaderVue from "../../src/components/HeaderVue.vue";
import FooterVue from "../../src/components/FooterVue.vue";
</script>

<template>
  <div class="wrapper">
    <HeaderVue />
    <main>
      <div class="container">
        <slot></slot>
      </div>
    </main>
    <FooterVue />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}
main {
  flex-grow: 1;
  padding: 16px 0;
}
</style>
