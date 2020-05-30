<template>
  <div class="container--details">
    <app-movie-details />
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
