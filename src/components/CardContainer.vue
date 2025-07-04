<script setup lang="ts">
import Card from './Card.vue';

</script>

<template>

  <section class="card_container">
    <Card/>
  </section>  
</template>
 <style scoped>
@reference '../style.css';
.card_container {
  @apply grid w-full h-full gap-8 p-8 grid-cols-1 grid-rows-10 lg:grid-cols-2 lg:grid-rows-5;
}

</style>
