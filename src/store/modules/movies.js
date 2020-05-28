import apiConfig from '../api/config';

// TYPES
import * as mutation from '../types/mutation';

// =========================
// STATE
// =========================

const state = {
  movies: []
};

// =========================
// GETTERS
// =========================

const getters = {
  getAvailableMovieList: state => state.movies
};

// =========================
// MUTATIONS
// =========================

const mutations = {
  [mutation.SET_AVAILABLE_LIST]: (state, movies) => { state.movies = movies }
};

// =========================
// ACTIONS
// =========================

const actions = {
  async displayFullList ({ commit }) {
    const response = await fetch(`${apiConfig.URL}/latest?api_key=${apiConfig.KEY}`);
    const data = await response.json()
    commit(mutation.SET_AVAILABLE_LIST, data);
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
