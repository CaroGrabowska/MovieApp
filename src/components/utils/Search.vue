<template>
  <div class="search">
    <input
      type="text"
      class="search__input"
      placeholder="What you wanna see today?..."
      v-model="searchTerm"
      @keyup.enter="setSearch(searchTerm)"
      @keyup="setSearch(searchTerm)"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Search',
  data () {
    return {
      searchTerm: ''
    }
  },
  methods: {
    ...mapActions(['setSearch'])
  }
}
</script>
<style>
</style>
