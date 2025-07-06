
<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const totalPages = computed(() => store.getters.totalPages)
const currentPage = computed(() => Number(store.state.currentPage))

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
    <button class="pagination_controls" @click="previousPage">Poprzedni</button>
    <!-- przyciski z numerami stron -->
    <div class="pagination_pages">
      <button v-for="page in totalPages" :key="page" :class="{active: page === currentPage}" @click="goToPage(page)">{{ page }}</button>
    </div>
    <button class="pagination_controls" @click="nextPage">Następny</button>
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
  @apply border border-midnight p-1 min-h-[30px] min-w-[30px] text-[16px];
}

.pagination_controls {
  @apply hover:text-seawater
}
.active {
  @apply bg-midnight text-white;
}
</style>
