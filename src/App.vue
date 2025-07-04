<script setup lang="ts">
import CardContainer from './components/CardContainer.vue';



</script>

<template>
  <header>
    <div class="navbar bg-clear-sky w-screen h-[80px] text-white text-2xl flex items-center p-4">LBJ Post List</div>
  </header>
  <main class="w-screen lg:max-w-[1024px] flex flex-col gap-4 bg-whitesmoke">
    <Suspense>
      <CardContainer/>
    </Suspense>
  </main>
</template>

