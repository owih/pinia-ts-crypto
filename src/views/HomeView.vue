<script setup lang="ts">
import MainLayout from "../layouts/MainLayout.vue";
</script>

<template>
  <MainLayout title="Menu">
    <div class="menu">
      <div class="container">
        <div class="menu__row">
          <div class="menu__item">
            <router-link class="menu__link" :to="{name: 'crypto'}">Crypto App</router-link>
          </div>
          <div class="menu__item">
            <router-link class="menu__link" :to="{name: 'stock'}">Stock App</router-link>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped lang="scss">
@import "../assets/variables";
.menu {
  &__row {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: -16px;
    flex-direction: column;
    @media (min-width: 576px) {
      flex-direction: row;
    }
  }
  &__item {
    padding: 16px;
  }
  &__link {
    display: flex;
    background-color: $primary;
    color: white;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    text-decoration: none;
    border: 1px solid lightgrey;
    border-radius: 12px;
    width: 200px;
    height: 200px;
    transition: $transition-base;
    &:hover {
      background-color: $green;
    }
  }
}
</style>
