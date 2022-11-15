<script setup lang="ts">
</script>

<template>
  <header>
    <div class="container">
      <nav class="navigation">
        <ul class="navigation__list">
          <li class="navigation__item">
            <router-link class="navigation__link" :to="{name: 'home'}">Home</router-link>
          </li>
          <li class="navigation__item">
            <router-link class="navigation__link" :to="{name: 'crypto'}">Crypto App</router-link>
          </li>
          <li class="navigation__item">
            <router-link class="navigation__link" :to="{name: 'stock'}">Stock App</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
@import "../assets/variables";
header {
  background-color: $primary;
  padding: 16px;
}
.navigation {
  &__list {
    display: flex;
    margin: -8px;
  }
  &__item {
    padding: 8px;
  }
  &__link {
    text-decoration: none;
    color: white;
    padding: 4px 0;
    border-radius: 6px;
    transition: $transition-base;
    &:hover {
      background-color: white;
      color: $primary;
    }
    @media (min-width: 576px) {
      padding: 4px 8px;
    }
  }
}
</style>
