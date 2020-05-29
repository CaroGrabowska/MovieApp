<template>
  <div class="filter">
    <label
      for="toprated"
      class="button"
    >Top Rated
      <input
        id="toprated"
        type="radio"
        class="button__input"
        value="top_rated"
        name="filter"
        v-model="filterStatus"
        @change="setFilter(filterStatus)"
      >
      <div>Top Rated</div>
    </label>
    <label for="nowplaying">Now playing
      <input
        id="nowplaying"
        type="radio"
        value="now_playing"
        name="filter"
        v-model="filterStatus"
        @change="setFilter(filterStatus)"
      >
    </label>
    <label for="popular">Popular
      <input
        id="popular"
        type="radio"
        value="popular"
        name="filter"
        v-model="filterStatus"
        @change="setFilter(filterStatus)"
      >
    </label>
    <label for="upcoming">Upcoming
      <input
        id="upcoming"
        type="radio"
        value="upcoming"
        name="filter"
        v-model="filterStatus"
        @change="setFilter(filterStatus)"
      >
    </label>
    <button
      class="reset"
      @click="displayListRest()"
    >Reset</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'MoviesListItem',
  props: ['movie'],
  data () {
    return {
      filterStatus: ''
    }
  },
  computed: {
    ...mapGetters(['getAvailableFilter'])
  },
  methods: {
    ...mapActions(['setFilter', 'fetchMovieList']),

    displayListRest () {
      this.filterStatus = '';
      this.setFilter(this.filterStatus);
      this.fetchMovieList()
    }
  }
}
</script>
<style>
</style>
