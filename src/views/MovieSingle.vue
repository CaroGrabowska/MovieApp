<template>
  <div class="movie-single">
    <app-movie-details />
  </div>
</template>

<script>
// @ is an alias to /src
import MovieSingleItemDetails from '@/components/movies/MovieSingleItemDetails.vue'

export default {
  name: 'MovieSingle',
  components: {
    'app-movie-details': MovieSingleItemDetails
  }
}
</script>
