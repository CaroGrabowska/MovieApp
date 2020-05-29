<template>
  <div class="wrapper">
    <app-search />
    <app-sort />
    <app-filter />
    <app-movie-list />
  </div>
</template>

<script>
// @ is an alias to /src
import MovieList from '@/components/movie/MovieList.vue'
import Filter from '@/components/utils/Filter.vue'
import Search from '@/components/utils/Search.vue'
import Sort from '@/components/utils/Sort.vue'

export default {
  name: 'Home',
  components: {
    'app-movie-list': MovieList,
    'app-filter': Filter,
    'app-search': Search,
    'app-sort': Sort
  }
}
</script>
