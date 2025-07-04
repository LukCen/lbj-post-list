<script setup lang="ts">
import { Trash2 } from 'lucide-vue-next';
import { generatePostData } from '../utils/api';
import { ref } from 'vue';
const postData = await generatePostData(10)


const showMore = ref(false)

</script>

<template>
  <div v-for="post in postData" class="card">
    <img :src="post.img" alt="">
    <div :class="{'show-more': showMore}" class="text">
      <h2 class="post_title capitalize text-clamp">{{ post.title }}</h2>
      <p>By <span class="text-seawater font-semibold">{{ post.author.name }}</span></p>
      <p class="post_contents text-clamp">{{ post.contents }}</p>
    </div>
    <div class="buttons">
      <button @click="showMore = !showMore" class="text-clear-sky hover:text-seawater font-semibold">Sprawdź więcej...</button>
      <button class="btn btn-delete"> <Trash2/> </button>
    </div>
  </div>
</template>

<style scoped>

.show-more > * {
  -webkit-line-clamp: unset;
  line-clamp: unset;
}

/* tailwind override */
img {
max-width: initial;
}

@reference "../style.css";

.card {
  @apply flex flex-col items-center justify-between bg-white rounded-md overflow-hidden gap-4 p-4 shadow-sm;

}

.text {
  @apply flex flex-col h-full gap-8;
}


.buttons {
  @apply flex w-full justify-between;
}
.btn {
  @apply flex bg-clear-sky hover:bg-seawater duration-150 rounded-md gap-4 p-1 w-fit text-white cursor-pointer;
}

.btn-delete {
  @apply bg-red-500 hover:bg-red-700;
}
</style>
