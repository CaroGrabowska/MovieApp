<template>
  <div class="movies__list">
    <Pagination></Pagination>
    <div v-if="getAvailableMovieList.length">
      <MoviesListItem
        v-for="movie in getAvailableMovieList"
        :key="movie.id"
        :movie="movie"
      ></MoviesListItem>
    </div>
    <div v-else>No data to display</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MoviesListItem from './MoviesListItem.vue';
import Pagination from '../Pagination.vue';

export default {
  name: 'MoviesList',
  components: { MoviesListItem, Pagination },
  computed: mapGetters(['getAvailableMovieList']),
  methods: {
    ...mapActions(['displayFullList'])
  },
  created () {
    this.displayFullList();
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
