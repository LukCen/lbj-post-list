
<script setup lang="ts">
import { ChevronLeftSquareIcon, ChevronRightSquareIcon } from 'lucide-vue-next';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const totalPages = computed(() => store.getters.totalPages)
const currentPage = computed(() => Number(store.state.currentPage))

// ograniczenie ilości wyświetlanych przycisków paginacji - zapobiega overflow na mobilce

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  // ile stron przed i po wyświetlić
  const range = 1

  const start = Math.max(1, current - range)
  const end = Math.min(total, current + range)

  const pages = []
  for(let i = start; i <= end; i++){
    pages.push(i)
  }
  return pages
})

function goToPage(page: number){
  store.commit('setPage', page)
  console.log(currentPage.value)
}

function previousPage(){
  if(currentPage.value > 1){
    goToPage(currentPage.value - 1)
  }
}

function nextPage(){
  if(currentPage.value < totalPages.value){
    goToPage(currentPage.value + 1)
  }
}


</script>
<template>
  <div class="pagination">
    <button v-if="currentPage > 1" class="pagination_controls" @click="previousPage"><ChevronLeftSquareIcon width="35" height="35" stroke-width="1"/></button>
    <!-- przyciski z numerami stron -->
    <div class="pagination_pages">
      <button v-if="currentPage > 3" @click="goToPage(1)">{{ 1 }}</button>
      <span v-if="currentPage > 3" class="text-center">...</span>
      <button v-for="page in visiblePages" :key="page" :class="{active: page === currentPage}" @click="goToPage(page)">{{ page }}</button>
      <span v-if="currentPage < totalPages - 1" class="text-center">...</span>
      <button v-if="currentPage < totalPages - 1" @click="goToPage(totalPages)">{{totalPages}}</button>
    </div>
    <button v-if="currentPage < totalPages"  class="pagination_controls" @click="nextPage"> <ChevronRightSquareIcon width="35" stroke-width="1" height="35"/> </button>
  </div>
</template>

<style scoped>
@reference "../style.css";

.pagination {
  @apply flex gap-2 px-1 col-span-2 w-full justify-center;
}
.pagination_pages {
  @apply flex gap-1;
}
.pagination_controls {
  @apply text-[16px];
}
.pagination_pages > * {
  @apply border border-midnight p-1 min-h-[25px] min-w-[25px] text-[16px];
}

.pagination_controls {
  @apply hover:text-seawater
}
.active {
  @apply bg-midnight text-white;
}
</style>
