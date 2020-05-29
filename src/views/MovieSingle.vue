<template>
  <div class="movie-details">
    <div class="movie-details__container">
      <app-movie-details />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MovieSingleDetails from '@/components/movie/MovieSingleDetails.vue'

export default {
  name: 'MovieSingle',
  components: {
    'app-movie-details': MovieSingleDetails
  }
}
</script>
