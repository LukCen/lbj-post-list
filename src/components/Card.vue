<script setup lang="ts">
import { Trash2, LoaderCircle} from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';


// paginacja
const store = useStore()
const postData = computed(() => store.getters.paginatedPosts)

const expandedPosts = ref(new Set<number>())
const loadedImages = ref(new Set<number>())
// identyfikuje który post użytkownik chce rozszerzyć, bazując na jego parametrze id
function toggleShowMore(postId: number){
  if(expandedPosts.value.has(postId)){
    expandedPosts.value.delete(postId)
  } else {
    expandedPosts.value.add(postId)
  }
}

function removePost(postId: number){
  store.dispatch('removePost', postId)
}

function handleImageLoad(postId: number){
  loadedImages.value.add(postId)
}

</script>

<template>
  <div v-for="post in postData" :key="post.id" class="card">
    <!-- fallback na czas ładowania zdjęcia -->
    <div class="loader-img" v-if="!loadedImages.has(post.id)">
      <LoaderCircle class="animate-spin" width="100" height="100"/>
    </div>

    <img @load="handleImageLoad(post.id)" :src="post.img" alt="">
    <div :class="{'show-more': expandedPosts.has(post.id)}" class="text">
      <h2 class="post_title capitalize text-clamp">{{ post.title }}</h2>
      <p>Autor: <span class="text-seawater font-semibold">{{ post.author.name }}</span></p>
      <p class="post_contents text-clamp">{{ post.contents }}</p>
    </div>
    <div class="buttons">
      <button @click="toggleShowMore(post.id)" class="show-more text-clear-sky hover:text-seawater text-xl font-semibold">Sprawdź więcej...</button>
      <button @click="removePost(post.id)" class="btn btn-delete"> <Trash2/> </button>
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
  width: 100%;
  height: 100%;
}

@reference "../style.css";

.card {
  @apply flex flex-col items-center self-start justify-between bg-white rounded-md overflow-hidden gap-4 p-4 shadow-sm;

  /* w kalkulacji stosuję piksele, nie remy/emy dla łatwiejszej identyfikacji z wbudowanymi wartościami z Tailwinda - podawane są w pikselach a mój projekt zmienił domyślny rozmiar czcionki w roocie */
  /* 32px równa się w tym przypadku klasie 'gap-8' na elemencie card_container*/
  /* flex: 1 1 calc(50% - 32px); */
  max-width: calc(50% - 32px);
}

/* wartość zgodna z Tailwindowskim breakpointem 'lg' */
@media (max-width: 1024px){
  .card{
    max-width: 100%;
  }
}

.loader-img {
  @apply flex justify-center items-center min-w-[400px] min-h-[300px];
}
.text {
  @apply flex flex-col h-fit gap-8;
}

.buttons {
  @apply flex w-full justify-between;
}
.btn {
  @apply flex duration-150 rounded-md gap-4 p-1 w-fit text-white cursor-pointer;
}
.btn-delete {
  @apply bg-red-500 hover:bg-red-700;
}
</style>
