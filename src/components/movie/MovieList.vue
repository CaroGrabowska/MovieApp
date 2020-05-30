<template>
  <div class="dashboard__container">
    <div class="dashboard__result result">
      <div
        class="result--success"
        v-if="getAvailableMovieList.length"
      >
        <MovieSingle
          v-for="movie in getAvailableMovieList"
          :key="movie.id"
          :movie="movie"
        ></MovieSingle>
      </div>
      <div
        class="result--failure"
        v-else
      >Search result not found</div>
    </div>
    <div class="dashboard__pagination">
      <Pagination></Pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MovieSingle from './MovieSingle.vue';
import Pagination from '../utils/Pagination';

export default {
  name: 'MoviesList',
  components: { MovieSingle, Pagination },
  computed: mapGetters(['getAvailableMovieList']),
  methods: {
    ...mapActions(['fetchMovieList'])
  },
  created () {
    this.fetchMovieList();
  }
}
</script>
