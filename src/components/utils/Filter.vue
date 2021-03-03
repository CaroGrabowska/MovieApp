<template>
  <div class="filter">
    <div class="filter__input">
      <label
        for="toprated"
        :class="{ 'activeFilter': filterStatus == 'top_rated' }"
      >Top Rated</label>
      <input
        id="toprated"
        type="radio"
        value="top_rated"
        name="filter"
        checked
        v-model="filterStatus"
        @change="setFilterStatus(filterStatus)"
      >
    </div>
    <div class="filter__input">
      <label
        for="nowplaying"
        :class="{ 'activeFilter': filterStatus == 'now_playing' }"
      >Now playing</label>
      <input
        id="nowplaying"
        type="radio"
        value="now_playing"
        name="filter"
        v-model="filterStatus"
        @change="setFilterStatus(filterStatus)"
      >
    </div>
    <div class="filter__input">
      <label
        for="popular"
        :class="{ 'activeFilter': filterStatus == 'popular' }"
      >Popular</label>
      <input
        id="popular"
        type="radio"
        value="popular"
        name="filter"
        v-model="filterStatus"
        @change="setFilterStatus(filterStatus)"
      >
    </div>
    <div class="filter__input">
      <label
        for="upcoming"
        :class="{ 'activeFilter': filterStatus == 'upcoming' }"
      >Upcoming</label>
      <input
        id="upcoming"
        type="radio"
        value="upcoming"
        name="filter"
        v-model="filterStatus"
        @change="setFilterStatus(filterStatus)"
      >
    </div>
    <div class="filter__reset">
      <button
        class="reset"
        @click="displayListRest()"
      >Reset all filters</button>
    </div>
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
    },

    setFilterStatus (status) {
      this.filterStatus = status;
      this.setFilter(status);
    }
  }
}
</script>
<style>
</style>
