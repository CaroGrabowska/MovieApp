<template>
  <div class="movie">
    <p>{{ movie.id }}</p>
    <p>{{ movie.title }}</p>
    <p>{{ movie.original_title }}</p>
    <p>{{ movie.popularity }}</p>
    <p>{{ movie.vote_average}}</p>
    <button
      :id="movie.id"
      @click="singleMovie(movie.id)"
    >View</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'MovieSingle',
  props: ['movie'],
  methods: {
    ...mapActions(['setPreviewItem']),

    singleMovie (id) {
      this.setSingleMovieURL(id);
      this.setPreviewItem(id)
    },
    setSingleMovieURL (id) {
      this.$router.push('/movie/' + id)
    }
  }
}
</script>
<style lang="scss">
.movie {
  width: 300px;
  height: 300px;
  margin: 10px;
  border: 1px solid black;
}
</style>
