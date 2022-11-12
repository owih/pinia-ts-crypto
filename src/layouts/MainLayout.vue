<script setup lang="ts">
import HeaderVue from "../../src/components/HeaderVue.vue";
import FooterVue from "../../src/components/FooterVue.vue";
const props = defineProps({
  title: String,
})
</script>

<template>
  <div class="wrapper">
    <HeaderVue />
    <main>
      <div class="container">
        <h1 class="title">{{ title }}</h1>
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
