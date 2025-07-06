import { createStore } from "vuex";
import { generatePostData } from "../utils/api";


/**
 * State użyty to kontroli listy postów
 * @param {Array} posts - lista postów które zostały wczytane
 * @param {number} currentPage - strona którą użytkownik wyświetla w danym momencie - kontroluje które posty są widoczne
 * @param {number} perPage - maksymalna ilość postów wyświetlana na każdej stronie
 

// dla uspokojenia TS - 'store' nie jest nigdzie wywoływany w tym pliku, więc TS i Vercel marudzą przy deployu
// @ts-ignore
*/
export const store = createStore({
  state: () => ({
    posts: [] as PostData[],
    currentPage: 1,
    perPage: 10,
    loading: false
  }),
  mutations: {
    setPosts(state, posts: PostData[]) {
      state.posts = posts
    },
    setPage(state, page) {
      state.currentPage = page
    },
    setLoading(state, status: boolean) {
      state.loading = status
    },
    removePost(state, postId: number) {
      state.posts = state.posts.filter(post => post.id !== postId)
    }
  },
  actions: {
    async fetchPosts({ commit }) {
      try {
        commit('setLoading', true)
        const data = await generatePostData()
        if (data) {
          commit('setPosts', data)
        }
        commit('setLoading', false)
      } catch (e) {
        console.error(`Błąd pobierania postów`, e)
      }
    },
    async removePost({ commit }, postId: number) {
      try {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
          method: 'DELETE',
        });
        commit('removePost', postId)
      } catch (e) {
        console.error(`Błąd w usuwaniu posta: ${e}`)
      }
    },
    setPage({ commit }, page) {
      commit('setPage', page)
    }
  },

  getters: {
    paginatedPosts: (state) => {
      const start = (state.currentPage - 1) * state.perPage
      return state.posts.slice(start, start + state.perPage)
    },
    totalPages: (state) => {
      return Math.ceil(state.posts.length / state.perPage)
    }
  }
})
