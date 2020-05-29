<template>
  <div class="movie-single">
    <div>
      <p>{{ getDetailsMovie.id }}</p>
      <p>{{ getDetailsMovie.title }}</p>
      <p
        v-for="genre in getDetailsMovie.genres"
        :key="genre.id"
      >
        <span>{{ genre.name}}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MovieSingleItemDetails',
  computed: mapGetters(['getDetailsMovie'])
}
</script>
