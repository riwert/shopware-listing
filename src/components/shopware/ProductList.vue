<script setup>
import ShopwareProductCard from './ProductCard.vue'

const props = defineProps({
  isLoading: Boolean | null,
  productList: Object | null,
})
</script>

<template>
  <div class="bg-light py-5">
    <div class="container">

      <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 justify-content-start g-4">
        <div v-if="isLoading" class="col mx-auto text-center"><h2>Wczytywanie...</h2></div>
        <div v-else-if="!productList?.length" class="col mx-auto text-center"><h2>Nic nie znaleziono.</h2></div>
        <div v-if="!isLoading" v-for="product in productList" :key="product.id" class="col">
          <ShopwareProductCard :product="product" />
        </div>
      </div>

    </div>
  </div>
</template>
