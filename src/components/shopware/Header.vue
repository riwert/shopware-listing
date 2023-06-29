<script setup>
import IconSort from '../icon/Sort.vue'

const props = defineProps(['sortOrder'])
const emit = defineEmits(['change'])

const handleSort = (event) => {
  emit('change', event.target.value)
}
</script>

<template>
  <header class="py-3 bg-dark shadow">
    <div class="container d-flex flex-wrap justify-content-center justify-content-sm-between align-items-center">

      <h1 class="h3 mb-3 mb-sm-0 text-white text-center text-sm-start w-100 w-sm-auto">Shopware Listing</h1>

      <div class="input-group w-auto">
        <label for="sorter" class="input-group-text"><IconSort aria-label="Sort icon - horizontal ellipsis in circle" /></label>
        <select :value="sortOrder" @change="handleSort" id="sorter" class="form-select" title="Sortuj">
          <option value="price-asc">najtańsze</option>
          <option value="price-desc">najdrosze</option>
        </select>
      </div>

    </div>
  </header>
</template>
