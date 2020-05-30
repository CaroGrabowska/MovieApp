<template>
  <div class="sort">
    <div class="sort__container">
      <div class="sort__title">Sort by:</div>
      <select
        class="sort__select"
        v-model="orderBy"
      >
        <option value="votes">Votes</option>
        <option value="popularity">Popularity</option>
      </select>
      <div class="sort__title">Order Direction:</div>
      <button
        class="sort__button"
        :class="{ 'active': orderDirection == 'asc' }"
        @click="setSortDetails('asc')"
      >Ascending</button><button
        class="sort__button"
        :class="{ 'active': orderDirection == 'desc' }"
        @click="setSortDetails('desc')"
      >Descending</button>
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
      this.setOrderDirection({ orderBy: this.orderBy, orderDirection: direction });
      this.orderDirection = direction;
    }
  }
};
</script>
