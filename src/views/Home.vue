<template>
  <div class="container container--home">
    <div class="toolkit">
      <div class="toolkit__search">
        <app-search />
      </div>
      <div class="toolkit__sort">
        <app-sort />
      </div>
      <div class="toolkit__filter">
        <app-filter />
      </div>
    </div>
    <div class="dashboard">
      <app-movie-list />
    </div>
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
