<template>
  <div class="hello">
    <p>{{ getAvailableMovieList }}</p>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'HelloWorld',
  data () {
    return {
      data: {}
    }
  },
  computed: mapGetters(['getAvailableMovieList']),
  methods: {
    ...mapActions(['displayFullList'])
  },
  created () {
    this.displayFullList();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
