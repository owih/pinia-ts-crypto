<script setup lang="ts">
import { apiUrl } from "../api/cryptoApi";

const url: string = apiUrl;
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  changes: {
    type: Number,
  },
  symbol: {
    type: String,
  },
  img: {
    type: String,
  },
});
</script>

<template>
  <div class="card">
    <div class="card__left">
      <img class="card__image" :src="img" :alt="name">
    </div>
    <div class="card__right">
      <div class="card__name">
        {{ name }}
      </div>
      <div class="card__price">
        <span>{{ price.toFixed(4) }}</span> USD
      </div>
      <div v-if="changes" class="card__changes">
        {{ changes ? changes.toFixed(6) : '' }} USD
      </div>
    </div>
    <div class="card__remove" @click="$emit('removeItem', name)">
      Remove
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/variables";
.card {
  position: relative;
  padding: 16px;
  box-shadow: 2px 2px 17px 4px rgba(34, 60, 80, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  &:hover & {
    &__remove {
      opacity: 0.95;
    }
  }
  &__remove {
    position: absolute;
    right: 8px;
    top: 8px;
    font-size: 0;
    font-weight: bold;
    padding: 4px;
    border: 2px solid $danger;
    border-radius: 6px;
    color: $danger;
    cursor: pointer;
    width: 32px;
    height: 32px;
    &:before {
      content: 'RM';
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      font-size: 14px;
    }
    @media (min-width: 992px) {
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: lightgrey;
      font-weight: normal;
      font-size: 20px;
      border-radius: 12px;
      opacity: 0;
      transition: $transition-base;
      &:before {
        content: '';
      }
    }
  }
  &__left {
    margin-right: 16px;
  }
  &__name {
    &:not(:last-child) {
      margin-bottom: 12px;
    }
    span {
      margin: 0 6px;
      color: $light;
    }
  }
  &__price {
    font-size: 16px;
    &:not(:last-child) {
      margin-bottom: 12px;
    }
    span {
      font-weight: bold;
    }
  }
  &__changes {
    font-size: 14px;
    color: $gray;
  }
  &__image {
    width: 46px;
    height: 46px;
  }
}
</style>
