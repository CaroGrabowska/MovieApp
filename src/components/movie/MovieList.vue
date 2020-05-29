<template>
  <div class="movies__list">
    <Pagination></Pagination>
    <div v-if="getAvailableMovieList.length">
      <MovieSingle
        v-for="movie in getAvailableMovieList"
        :key="movie.id"
        :movie="movie"
      ></MovieSingle>
    </div>
    <div v-else>No data to display</div>
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
<style scoped lang="scss">
.movies__list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: auto;
}
</style>
