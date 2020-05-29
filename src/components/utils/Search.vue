<template>
  <div class="search">
    <input
      type="text"
      placeholder="Search pharse"
      v-model="searchTerm"
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
