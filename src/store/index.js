import Vue from 'vue';
import Vuex from 'vuex';
import moviesModule from './modules/movies'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    movies: moviesModule
  }
});
