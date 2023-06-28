<script setup>
import { ref, watch } from 'vue'
import { useFetch, useDebounce } from '@vueuse/core'
import IconSort from './icons/IconSort.vue'
import IconSearch from './icons/IconSearch.vue'
import ShopwareProduct from './ShopwareProduct.vue'

const apiUrl = import.meta.env.VITE_API_URL
const apiKey = import.meta.env.VITE_API_KEY

const searchUrl = apiUrl+'/search'
const productListingUrl = apiUrl+'/product-listing/e435c9763b0d44fcab67ea1c0fdb3fa0'

const savedSearchQuery = localStorage.getItem('searchQuery') || ''
const searchQuery = ref(savedSearchQuery)
const debouncedSearchQuery = useDebounce(searchQuery, 500)
const savedSortOrder = localStorage.getItem('sortOrder') || 'price-asc'
const sortOrder = ref(savedSortOrder)
const productList = ref([])
const isLoading = ref(true)

const productListing = async () => {
  const url = (debouncedSearchQuery?.value) ? searchUrl : productListingUrl
  const headers = {
    'Content-Type': 'application/json',
    'sw-access-key': apiKey
  }
  const body = {
    "order": sortOrder.value,
    "includes": {
        "product": [
            "id",
            "name",
            "description",
            "translated",
            "calculatedPrice"
        ],
        "calculated_price": [
            "totalPrice",
            "listPrice"
        ]
    }
  }

  if (debouncedSearchQuery?.value) {
    body.search = debouncedSearchQuery?.value
  }

  try {

    isLoading.value = true

    const { isFetching, error, data } = await useFetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    }).json()

    isLoading.value = isFetching?.value

    if (data?.value) {
      productList.value = data.value.elements
    }

    if (error?.value) {
      console.error('Error:', error.value)
    }

  } catch (error) {
    console.error('Catch Error:', error);
    isLoading.value = false
  }
}

productListing()

const handleSort = () => {
  localStorage.setItem('sortOrder', sortOrder.value)
  productListing()
}

const handleSearch = () => {
  localStorage.setItem('searchQuery', searchQuery.value)
  productListing()
}

watch(debouncedSearchQuery, handleSearch)

</script>

<template>
  <header class="py-3 bg-dark shadow">
    <div class="container d-flex flex-wrap justify-content-center justify-content-sm-between align-items-center">

      <h1 class="h3 mb-3 mb-sm-0 text-white text-center text-sm-start w-100 w-sm-auto">Shopware Listing</h1>

      <div class="input-group w-auto">
        <label for="sorter" class="input-group-text"><IconSort aria-label="Sort icon - horizontal ellipsis in circle" /></label>
        <select v-model="sortOrder" @change="handleSort" id="sorter" class="form-select" title="Sortuj">
          <option value="price-asc">najtańsze</option>
          <option value="price-desc">najdrosze</option>
        </select>
      </div>

    </div>
  </header>

  <div class="container text-center py-5 my-sm-5">
    <div class="input-group w-md-50 mx-sm-auto">
      <input type="text" v-model="searchQuery" id="searcher" class="form-control" placeholder="Szukaj...">
      <label for="searcher" class="input-group-text"><IconSearch aria-label="Search icon - magnifying glass in circle" /></label>
    </div>
  </div>

  <div class="bg-light py-5">
    <div class="container">

      <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 justify-content-start g-4">
        <div v-if="isLoading" class="col mx-auto text-center"><h2>Wczytywanie...</h2></div>
        <div v-else-if="!productList?.length" class="col mx-auto text-center"><h2>Nic nie znaleziono.</h2></div>
        <div v-if="!isLoading" v-for="product in productList" :key="product.id" class="col">
          <ShopwareProduct :product="product" />
        </div>
      </div>

    </div>
  </div>
</template>
