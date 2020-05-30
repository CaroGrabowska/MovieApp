<template>
  <div class="single-preview-extended">
    <div class="single-preview-dashboard">
      <div class="single-preview-dashboard__img">
        <img
          :src="setImgFullPath"
          :alt="getDetailsMovie.title"
        >
      </div>
      <div class="single-preview-dashboard__overlay"></div>
      <button
        class="single-preview-dashboard__button"
        @click="setBackPage()"
      >Back</button>
      <div class="single-preview-dashboard__heading">
        <div class="single-preview-dashboard__title">{{ getDetailsMovie.title }}</div>
        <div class="single-preview-dashboard__subheading">
          <div class="single-preview-dashboard__info">{{ getDetailsMovie.original_title }}</div>
          <div class="single-preview-dashboard__info">{{ getDetailsMovie.release_date | slice }}</div>
          <div class="single-preview-dashboard__info">{{ getDetailsMovie.runtime}} min</div>

        </div>
        <div class="single-preview-dashboard__votes votes">
          <svg
            height="511pt"
            viewBox="0 -10 511.987 511"
            width="511pt"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M510.652 185.902a27.158 27.158 0 00-23.425-18.71l-147.774-13.419-58.433-136.77C276.71 6.98 266.898.494 255.996.494s-20.715 6.487-25.023 16.534l-58.434 136.746-147.797 13.418A27.208 27.208 0 001.34 185.902c-3.371 10.368-.258 21.739 7.957 28.907l111.7 97.96-32.938 145.09c-2.41 10.668 1.73 21.696 10.582 28.094 4.757 3.438 10.324 5.188 15.937 5.188 4.84 0 9.64-1.305 13.95-3.883l127.468-76.184 127.422 76.184c9.324 5.61 21.078 5.097 29.91-1.305a27.223 27.223 0 0010.582-28.094l-32.937-145.09 111.699-97.94a27.224 27.224 0 007.98-28.927zm0 0"
              fill="#ffc107"
            /></svg>
          <div class="votes__average">{{ getDetailsMovie.vote_average}}</div>
          <div class="votes__count">{{ getDetailsMovie.vote_count}} votes </div>
        </div>
        <div class="single-preview-dashboard__overview">{{ getDetailsMovie.overview }}</div>
        <div class="single-preview-dashboard__generes generes">
          <div class="generes__container">
            <div
              class="generes__item"
              v-for="genres in getDetailsMovie.genres"
              :key="genres.id"
            >{{ genres.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import apiDefaults from '../../api/defaults';

export default {
  name: 'MovieSingleDetails',
  computed: {
    ...mapGetters(['getDetailsMovie']),

    setImgFullPath () {
      return `${apiDefaults.IMG_URL}${this.getDetailsMovie.poster_path}`
    }
  },
  methods: {
    setBackPage () {
      this.$router.back()
    }
  },

  filters: {
    slice: function (text) {
      return text.slice(0, 4);
    }
  }
}
</script>
