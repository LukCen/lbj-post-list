<script setup lang="ts">
import Card from './Card.vue';
import Pagination from './Pagination.vue';

</script>

<template>

  <section class="card_container">
    <Card/>
    <Pagination/>
  </section>  
</template>
 <style scoped>
@reference '../style.css';
.card_container {
  @apply grid w-full h-full gap-8 p-8 grid-cols-1 lg:grid-cols-2;
}

</style>
