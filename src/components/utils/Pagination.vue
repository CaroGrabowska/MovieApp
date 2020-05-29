<template>
  <div class="pagination">
    <sliding-pagination
      :current="currentPage"
      :total="getAvailablePageList"
      @page-change="pageChangeHandler"
    ></sliding-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SlidingPagination from 'vue-sliding-pagination'

export default {
  name: 'Pagination',
  data () {
    return {
      currentPage: 1
    }
  },
  components: { SlidingPagination },
  computed: mapGetters(['getAvailablePageList', 'getCurrentPage']),
  methods: {
    ...mapActions(['setPageToDisplay']),
    pageChangeHandler (selectedPage) {
      this.currentPage = selectedPage;
      this.setPageToDisplay(this.currentPage);
    }
  }
}
</script>
<style>
</style>
