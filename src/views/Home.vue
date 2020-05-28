<template>
  <div class="home">
    <app-search />
    <app-filter />
    <app-movie-list />
  </div>
</template>

<script>
// @ is an alias to /src
import MoviesList from '@/components/movies/MoviesList.vue'
import Filter from '@/components/Filter.vue'
import Search from '@/components/Search.vue'

export default {
  name: 'Home',
  components: {
    'app-movie-list': MoviesList,
    'app-filter': Filter,
    'app-search': Search
  }
}
</script>
