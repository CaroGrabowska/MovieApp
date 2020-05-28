<template>
  <div class="movie">
    {{ movie.title }}
  </div>
</template>

<script>
export default {
  name: 'MoviesListItem',
  props: ['movie']
}
</script>
<style lang="scss">
.movie {
  width: 200px;
  height: 200px;
  margin: 10px;
  border: 1px solid black;
}
</style>
