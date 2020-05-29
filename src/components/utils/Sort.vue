<template>
  <div class="filter">
    <div>
      Sort by:
      <select v-model="orderBy">
        <option value="votes">Votes</option>
        <option value="popularity">Popularity</option>
      </select>
      <label class="filter-label">Order Direction</label>
      <button
        class="asc order-direction"
        v-bind:class="{ 'active': orderDirection == 'asc' }"
        v-on:click="setSortDetails('asc')"
      >Asc</button><button
        class="desc order-direction"
        v-bind:class="{ 'active': orderDirection == 'desc' }"
        v-on:click="setSortDetails('desc')"
      >Desc</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'Sort',
  data () {
    return {
      orderBy: 'votes',
      orderDirection: 'asc'
    }
  },
  methods: {
    ...mapActions(['setOrderDirection']),
    setSortDetails (direction) {
      this.setOrderDirection({ orderBy: this.orderBy, orderDirection: direction })
    }
  }
};
</script>
<style>
</style>
