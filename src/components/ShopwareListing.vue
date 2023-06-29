<script setup>
import { ref, watch } from 'vue'
import { useFetch, useDebounce } from '@vueuse/core'

import ShopwareHeader from './shopware/Header.vue'
import ShopwareSearcher from './shopware/Searcher.vue'
import ShopwareProductList from './shopware/ProductList.vue'

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

const handleSort = (value) => {
  sortOrder.value = value
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

  <ShopwareHeader :sort-order="sortOrder" @change="handleSort" />

  <ShopwareSearcher v-model:search-query="searchQuery" />

  <ShopwareProductList :is-loading="isLoading" :product-list="productList" />

</template>
