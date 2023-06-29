<script setup>
import { computed } from 'vue'
import IconSearch from '../icon/Search.vue'

const props = defineProps(['searchQuery'])
const emit = defineEmits(['update:searchQuery'])

const searchQuery = computed({
  get() {
    return props.searchQuery
  },
  set(value) {
    emit('update:searchQuery', value)
  }
})
</script>

<template>
  <div class="container text-center py-5 my-sm-5">
    <div class="input-group w-md-50 mx-sm-auto">
      <input type="text" v-model="searchQuery" id="searcher" class="form-control" placeholder="Szukaj...">
      <label for="searcher" class="input-group-text"><IconSearch aria-label="Search icon - magnifying glass in circle" /></label>
    </div>
  </div>
</template>
