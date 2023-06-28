<script setup>
import usePriceFormatter from '../composables/usePriceFormatter'

const props = defineProps({
  product: Object
})
</script>

<template>
  <div class="card bg-white shadow h-100">
    <div class="card-body d-flex flex-column justify-content-between">
      <h2 class="card-title h6 fw-bold">{{ product.translated.name || product.name }}</h2>
      <p class="card-text">{{ product.translated.description || product.description }}</p>
      <p class="card-text"><strong>Cena</strong> {{ usePriceFormatter(product.calculatedPrice.totalPrice) }} zł</p>
    </div>
  </div>
</template>
