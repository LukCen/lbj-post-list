import { createStore } from "vuex/types/index.js";
import { generatePostData } from "../utils/api";


/**
 * State użyty to kontroli listy postów
 * @param {Array} posts - lista postów które zostały wczytane
 * @param {number} currentPage - strona którą użytkownik wyświetla w danym momencie - kontroluje które posty są widoczne
 * @param {number} perPage - maksymalna ilość postów wyświetlana na każdej stronie
 */
const store = createStore({
  state: () => ({
    posts: [],
    currentPage: 1,
    perPage: 10,
    loading: false
  }),

  mutations: {
    setPosts(state, payload) {
      state.posts = payload
    },
    setPage(state, page) {
      state.currentPage = page
    }
  },
  actions: {
    async fetchPosts({ commit, state }) {
      try {
        commit('setLoading', true)
        const data = await generatePostData(state.perPage)
        commit('setPosts', data)
        commit('setLoading', false)
      } catch (e) {
        console.error(`Błąd pobierania postów`, e)
      }
    },
    setPage({ commit }, page) {
      commit('setCurrentPage', page)
    }
  },
  getters: {
    paginatedPosts: (state) => {
      const start = (state.currentPage - 1) * state.perPage
      return state.posts.slice(start, start + state.perPage)
    }
  }
})
